let Config = require('../Config');
var UniversalFunctions = require('../Utils/UniversalFunctions');
var async = require('async');
var Path = require('path');
var fsExtra = require('fs-extra');
var Fs = require('fs');
var AWS = require("aws-sdk");
var mime = require('mime-types')
const getVideoInfo = require('get-video-duration');


AWS.config.update({
    accessKeyId: Config.awsS3Config.s3BucketCredentials.accessKeyId,
    secretAccessKey:Config.awsS3Config.s3BucketCredentials.secretAccessKey
    //  region:' '
});
var s3 = new AWS.S3();

function uploadMultipart(fileInfo, uploadCb) {
    var options = {
        Bucket: Config.awsS3Config.s3BucketCredentials.bucket,
        Key: fileInfo.filename,
        ACL: 'public-read',
        ContentType: mime.lookup(fileInfo.filename),
        ServerSideEncryption: 'AES256'
    };

    s3.createMultipartUpload(options, (mpErr, multipart) => {
        if (!mpErr) {
            //console.log("multipart created", multipart.UploadId);
            Fs.readFile(fileInfo.path, (err, fileData) => {

                var partSize = 5242880;
                var parts = Math.ceil(fileData.length / partSize);

                async.times(parts, (partNum, next) => {

                    var rangeStart = partNum * partSize;
                    var end = Math.min(rangeStart + partSize, fileData.length);

                    console.log("uploading ", fileInfo.filename, " % ", (partNum / parts).toFixed(2));

                    partNum++;
                    async.retry((retryCb) => {
                        s3.uploadPart({
                            Body: fileData.slice(rangeStart, end),
                            Bucket: Config.awsS3Config.s3BucketCredentials.bucket,
                            Key: fileInfo.filename,
                            PartNumber: partNum,
                            UploadId: multipart.UploadId
                        }, (err, mData) => {
                            retryCb(err, mData);
                        });
                    }, (err, data) => {
                        console.log(data);
                        next(err, {ETag: data.ETag, PartNumber: partNum});
                    });

                }, (err, dataPacks) => {
                    s3.completeMultipartUpload({
                        Bucket: Config.awsS3Config.s3BucketCredentials.bucket,
                        Key: fileInfo.filename,
                        MultipartUpload: {
                            Parts: dataPacks
                        },
                        UploadId: multipart.UploadId
                    }, uploadCb);
                });
            });
        } else {
            uploadCb(mpErr);
        }
    });
}

function uploadFile1(fileObj, uploadCb) {

    var fileName = Path.basename(fileObj.finalUrl);
    var stats = Fs.statSync(fileObj.path);

    var fileSizeInBytes = stats["size"];

    if (fileSizeInBytes < 5242880) {
        async.retry((retryCb) => {
            Fs.readFile(fileObj.path, (err, fileData) => {
                s3.putObject({
                    Bucket: Config.awsS3Config.s3BucketCredentials.bucket,
                    Key: fileName,
                    Body: fileData,
                    ContentType: mime.lookup(fileName)
                }, retryCb);
            });
        }, uploadCb);
    } else {
        fileObj.filename = fileName;
        uploadMultipart(fileObj, uploadCb)
    }
}


var uploadFilesOnS3 = function (fileData, callback) {

    var imageFile = false;
    var filename;
    var ext;
    var dataToUpload = []

    console.log(fileData);
    
    if (!fileData || !fileData.filename) {
        return callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    } else {
        filename = fileData.filename.toString();
        ext = filename.substr(filename.lastIndexOf('.'))
        var videosFilesExt = ['.3gp', '.3GP', '.mp4', '.MP4', '.avi', '.AVI'];
        var imageFilesExt = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG', '.gif', '.GIF','.pdf'];
        if (ext) {
            if (imageFilesExt.indexOf(ext) >= 0) {
                imageFile = true
            } else {
                if (!(videosFilesExt.indexOf(ext) >= 0)) {
                    return callback()
                }
            }
        } else {
            return callback()
        }
    }

    //  create file names ==============

    fileData.original = UniversalFunctions.getFileNameWithUserId(false, filename);
    fileData.thumb = UniversalFunctions.getFileNameWithUserId(true, imageFile && filename || (filename.substr(0, filename.lastIndexOf('.'))) + '.jpg');


    // for set parrallel uploads on s3 bucket

    dataToUpload.push({
        path: Path.resolve('.') + '/uploads/' + fileData.thumb,
        finalUrl: Config.awsS3Config.s3BucketCredentials.s3URL + fileData.thumb,
    })

    dataToUpload.push({
        path: fileData.path,
        finalUrl: Config.awsS3Config.s3BucketCredentials.s3URL + fileData.original
    })


    async.auto({
        checkVideoDuration: function (cb) {
            if (!imageFile) {
                getVideoInfo(fileData.path).then(info => {
                    if (info.format.duration < 10) {
                        cb()
                    } else {
                        cb()
                    }
                })
            } else {
                cb()
            }
        },
        creatingThumb: ['checkVideoDuration', function (err,cb) {
            if (imageFile) {
                console.log('=======  IMAGE ===============')
                createThumbnailImage(fileData.path, Path.resolve('.') + '/uploads/' + fileData.thumb, function (err) {
                    cb()
                })
            } else {
                cb()
                // createVideoThumb(fileData, Path.resolve('.') + '/uploads/' + fileData.thumb, function (err) {
                //     cb(err)
                // })
            }
        }],
        uploadOnS3: ['creatingThumb', function (err,cb) {
            var functionsArray = [];

            dataToUpload.forEach(function (obj) {
                functionsArray.push((function (data) {
                    return function (internalCb) {
                        uploadFile1(data, internalCb)
                    }
                })(obj))
            });

            async.parallel(functionsArray, (err, result) => {
                deleteFile(Path.resolve('.') + '/uploads/' + fileData.thumb);
                cb(err)
            })

        }]
    }, function (err) {
        let responseObject = {
            original: Config.awsS3Config.s3BucketCredentials.s3URL + fileData.original,
            thumbnail: Config.awsS3Config.s3BucketCredentials.s3URL + fileData.thumb,
          //  type: imageFile && 'IMAGE' || 'VIDEO'
        };
        callback(err, responseObject);
    })
};

function deleteFile(path) {
    fsExtra.remove(path, function (err) {
        console.log('error deleting file>>', err)
    });
}
/*
function createThumbnailImage(originalPath, thumbnailPath, callback) {
    var gm = require('gm').subClass({imageMagick: true});
    gm(originalPath)
        .resize(Config.APP_CONSTANTS.SERVER.THUMB_WIDTH, Config.APP_CONSTANTS.SERVER.THUMB_HEIGHT, "!")
        .autoOrient()
        .write(thumbnailPath, function (err, data) {
            callback(err)
        })
};*/

function createThumbnailImage(originalPath, thumbnailPath, callback) {
    var gm = require('gm').subClass({imageMagick: true});

    var readStream = Fs.createReadStream(originalPath);
    gm(readStream)
        .size({bufferStream: true}, function (err, size) {
            console.log("sixw***********",size)
            if (size){
                this.thumb(size.width ,size.height,thumbnailPath,50,
                    /* .autoOrient()
                     .write(thumbnailPath1,*/ function (err, data) {
                        callback()
                    })
            }
        });
}

function createVideoThumb(fileData, thumbnailPath, callback) {

    // Thumbler({
    //     type: 'video',
    //     input: fileData.path,
    //     output: thumbnailPath,
    //     time: '00:00:03',
    //     size: '300x200' // this optional if null will use the desimention of the video
    // }, function (err) {
    //     callback(err)
    // });

}

module.exports = {
    uploadFilesOnS3: uploadFilesOnS3
}