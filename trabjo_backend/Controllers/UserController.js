const Config = require('../Config');
const Service = require('../Services').queries;
const TokenManager = require('../Lib/TokenManager');
const UploadMultipart = require('../Lib/UploadMultipart');
const Modal = require('../Models');
const UniversalFunctions = require('../Utils/UniversalFunctions');
let mongoose = require('mongoose');

async function userRegisteration(payloadData) {
    let query = {
        email: payloadData.email,
        isDeleted: false
    };
    let check1 = await getRequired(Modal.Users, query, {}, {});
    if (check1.length)
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.ALREADY_EXIST)

    let register = await registerUser(payloadData);
    return await tokenUpdate(register);
}

async function registerUser(payloadData) {
    return new Promise((resolve, reject) => {

        let dataToSave = {
            email: payloadData.email,
        };

        if (payloadData.password) dataToSave.password = UniversalFunctions.CryptData(payloadData.password);

        if (payloadData.name) dataToSave.name = payloadData.name;
        if (payloadData.deviceToken) dataToSave.deviceToken = payloadData.deviceToken;
        if (payloadData.countryCode) dataToSave.countryCode = payloadData.countryCode;
        if (payloadData.phoneNumber) dataToSave.phoneNumber = payloadData.phoneNumber;
        if (payloadData.type) dataToSave.accountType = payloadData.type;
        if (payloadData.experienced) dataToSave.experienced = payloadData.experienced;
        dataToSave.countryId = "5d59308a322cd808f310d3cd"

        Service.saveData(Modal.Users, dataToSave, (err, result) => {
            if (err) reject(err);
            else {
                resolve(result)
            }
        })
    });
}

async function login(payloadData) {
    console.log("payloadDatapayloadData", payloadData)
    let f1 = await verifyUser(payloadData);
    if (!f1.isRegister)
        return f1;
    else {
        let f2 = await tokenUpdate(f1);

        let dataToSet = {};
        if (payloadData.deviceToken) dataToSet.deviceToken = payloadData.deviceToken;
        if (payloadData.location) dataToSet.location = payloadData.location;

        let data = await updateData(Modal.Users, { email: payloadData.email }, dataToSet, { lean: true });
        data.type = UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.USER_TYPE.USER;
        data.isRegister = true;
        console.log("datadatadata", data)
        return data
    }
}

function verifyUser(payloadData) {

    return new Promise((resolve, reject) => {
        let getCriteria = {};

        getCriteria.email = payloadData.email;
        let project = {
            deviceToken: 0
        };
        Service.getData(Modal.Users, getCriteria, project, { lean: true }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result && result.length) {
                    let userData = {}
                    if (payloadData.loginBy === 1 && result[0].password !== UniversalFunctions.CryptData(payloadData.password))
                        reject(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_PASSWORD);
                    else if (result[0].isBlocked)
                        reject(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.BLOCKED);
                    else {
                        console.log("resultresult", result)
                        userData = result[0]
                        // result[0].type = UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.USER_TYPE.USER;
                        // result[0].isRegister = true;
                        userData.type = UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.USER_TYPE.USER;
                        userData.isRegister = true;
                        console.log("resultresult>>>>>>>>>>>>>>.", userData)
                        resolve(userData)
                    }
                } else {
                    resolve({ isRegister: false });
                }
            }
        });
    });
}

function tokenUpdate(data) {
    let tokenData = {
        _id: data._id,
        type: Config.APP_CONSTANTS.DATABASE.USER_TYPE.USER,
        tokenTime: new Date().getTime()
    };
    return new Promise((resolve, reject) => {
        TokenManager.setToken(tokenData, function (err, output) {
            if (err) {
                reject(err);
            } else {
                resolve(output)
            }
        });
    });
}

async function logout(userData) {
    return new Promise(async (resolve, reject) => {
        let option = { lean: true }
        let getCriteria = {
            _id: userData._id
        };
        let dataToSet = {
            accessToken: ""
        }

        let data = await updateData(Modal.Users, getCriteria, dataToSet, { lean: true });
        resolve(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.LOGOUT)
    });
}

async function getIndustriesList(payloadData) {
    return new Promise(async (resolve, reject) => {

        let query = {
            isDeleted: false,
            isBlocked: false,
        };
        let industriesList = await getRequired(Modal.Industries, query, { name: 1 }, { lean: true });
        resolve(industriesList)
    });
}

async function getJobRolesList(payloadData) {
    return new Promise(async (resolve, reject) => {

        let query = {
            industryId: payloadData.industryId,
            isDeleted: false,
            isBlocked: false,
        };
        let jobRolesList = await getRequired(Modal.JobRoles, query, { name: 1 }, { lean: true });
        resolve(jobRolesList)
    });
}

async function jobPosting(payloadData, userData) {
    return new Promise((resolve, reject) => {

        let dataToSave = {};
        let date = new Date().getTime()

        if (payloadData.industryId) dataToSave.industryId = payloadData.industryId;
        if (payloadData.jobRoleId) dataToSave.jobRoleId = payloadData.jobRoleId;
        if (payloadData.jobType) dataToSave.jobType = payloadData.jobType;
        if (payloadData.salary) dataToSave.salary = payloadData.salary;
        if (payloadData.englishLevel) dataToSave.englishLevel = payloadData.englishLevel;
        if (payloadData.verify) dataToSave.verify = payloadData.verify;
        if (payloadData.hours) dataToSave.hours = payloadData.hours;
        if (payloadData.experience) dataToSave.experience = payloadData.experience;
        if (payloadData.vacanciesNumber) dataToSave.vacanciesNumber = payloadData.vacanciesNumber;
        if (payloadData.startDate) dataToSave.startDate = payloadData.startDate;
        if (payloadData.endDate) dataToSave.endDate = payloadData.endDate;
        if (payloadData.location) dataToSave.location = payloadData.location;
        if (payloadData.skills) dataToSave.skills = payloadData.skills;
        if (payloadData.description) dataToSave.description = payloadData.description;
        if (payloadData.spanishTranslationNeeded) dataToSave.spanishTranslationNeeded = payloadData.spanishTranslationNeeded;
        dataToSave.createdBy = userData._id;
        dataToSave.createdAt = date
        dataToSave.updatedAt = date


        Service.saveData(Modal.Jobs, dataToSave, (err, result) => {
            if (err) reject(err);
            else {
                resolve(result)
            }
        })
    });
}

async function jobListing(payloadData, userData) {
    return new Promise(async (resolve, reject) => {
        let options = { lean: true }
        if (payloadData.skip) options.skip = payloadData.skip
        if (payloadData.limit) options.limit = payloadData.limit
        let query = {
            isDeleted: false,
            isBlocked: false,
        };

        if (payloadData.type == 1) {
            query.createdBy = userData._id
        }

        let project = {}
        let populate = [
            {
                path: 'industryId',
                select: '_id name'
            },
            {
                path: 'jobRoleId',
                select: '_id name'
            },
            {
                path: 'createdBy',
                select: '_id name'
            }
        ];
        if (payloadData.jobId) query._id = payloadData.jobId

        let [jobList, count] = await Promise.all([getRequiredPopulate(Modal.Jobs, query, project, options, populate), getCount(Modal.Jobs, query)]);

        payloadData.jobId ? resolve(jobList[0]) : resolve({ list: jobList, count: count })
    });
}

async function userListing(payloadData, userData) {
    return new Promise(async (resolve, reject) => {
        let options = { lean: true }
        // if (payloadData.skip) options.skip = payloadData.skip
        // if (payloadData.limit) options.limit = payloadData.limit
        let query = {
            isDeleted: false,
            isBlocked: false,
        };

        let project = {}
        let populate = [
            {
                path: 'countryId',
                select: '_id name'
            },
            {
                path: 'stateId',
                select: '_id name'
            },
            {
                path: 'cityId',
                select: '_id name'
            },
            {
                path: 'organisationDetails.stateId',
                select: '_id name'
            },
            {
                path: 'organisationDetails.cityId',
                select: '_id name'
            }
        ];
        if (payloadData.userId) query._id = mongoose.Types.ObjectId(payloadData.userId)
        let pipeline = [
            {
                $match:query
            },
            {
                $lookup:{
                    from : "workexperiences",
                    localField : "_id",
                    foreignField : "userId",
                    as : "experienceData"
                }
            }
        ];
        if(!payloadData.userId){
            if (payloadData.skip) pipeline.push({$skip:payloadData.skip})
            if (payloadData.limit) pipeline.push({$limit:payloadData.limit})
        }
        
        let [userList, count] = await Promise.all([aggregatePopulate(Modal.Users, pipeline, populate), getCount(Modal.Users, query)]);
        payloadData.userId ? resolve(userList[0]) : resolve({ list: userList, count: count })
    });
}

async function getStateList(payloadData) {
    return new Promise(async (resolve, reject) => {

        let countryId = await getRequired(Modal.Countries, {}, { name: 1 }, { lean: true });
        if (countryId && countryId.length >= 1) {
            let query = {
                countryId: countryId[0]._id,
                isDeleted: false,
                isBlocked: false,
            };
            let stateList = await getRequired(Modal.States, query, { name: 1 }, { lean: true });
            resolve(stateList)
        }

    });
}

async function getCitiesList(payloadData) {
    return new Promise(async (resolve, reject) => {

        let query = {
            stateId: payloadData.stateId,
            isDeleted: false,
            isBlocked: false,
        };
        let stateList = await getRequired(Modal.Cities, query, { name: 1 }, { lean: true });
        resolve(stateList)


    });
}

async function updateProfile(payloadData, userData) {
    return new Promise(async (resolve, reject) => {
        let dataToSet = {}

        if (payloadData.name) dataToSet.name = payloadData.name
        if (payloadData.dob) dataToSet.dob = payloadData.dob
        if (payloadData.phoneNumber) dataToSet.phoneNumber = payloadData.phoneNumber
        if (payloadData.stateId) dataToSet.stateId = payloadData.stateId
        if (payloadData.cityId) dataToSet.cityId = payloadData.cityId
        if (payloadData.zipcode) dataToSet.zipcode = payloadData.zipcode
        if (payloadData.address) dataToSet.address = payloadData.address
        if (payloadData.address1) dataToSet.address1 = payloadData.address1
        if (payloadData.organisationPart) dataToSet.organisationPart = payloadData.organisationPart
        if (payloadData.experienced) dataToSet.experienced = payloadData.experienced


        if (payloadData.organisationPart == "1") {
            dataToSet.organisationDetails = {}
            if (payloadData.companyName) dataToSet.organisationDetails.name = payloadData.companyName
            if (payloadData.companyDesignation) dataToSet.organisationDetails.designation = payloadData.companyDesignation
            if (payloadData.companyPhoneNumber) dataToSet.organisationDetails.phoneNumber = payloadData.companyPhoneNumber
            if (payloadData.companyStateId) dataToSet.organisationDetails.stateId = payloadData.companyStateId
            if (payloadData.companyCityId) dataToSet.organisationDetails.cityId = payloadData.companyCityId
            if (payloadData.companyZipcode) dataToSet.organisationDetails.zipcode = payloadData.companyZipcode
            if (payloadData.companyAddress) dataToSet.organisationDetails.address = payloadData.companyAddress
            if (payloadData.companyAddress1) dataToSet.organisationDetails.address1 = payloadData.companyAddress1
        }

        console.log("dataToSetdataToSet", dataToSet)
        let data = await updateData(Modal.Users, { _id: userData._id }, dataToSet, { lean: true, new: true });
        resolve(data)
    })
}

async function addUserExperiences(payloadData, userData) {
    return new Promise(async (resolve, reject) => {
        console.log("userDatauserDatauserData",userData)
        let date = new Date().getTime()
        let userDataToUpdate = {}

        if (payloadData.experiences && payloadData.experiences.length > 0) {
            payloadData.experiences.map(function(experience, index) {                
                experience["userId"] = userData._id;
                experience["createdAt"] = date;
                experience["updatedAt"] = date;
            });
            await insertMultiple(Modal.WorkExperiences,payloadData.experiences)
        }

        if(payloadData.referenceEmail1) userDataToUpdate.referenceEmail1 = payloadData.referenceEmail1
        if(payloadData.referenceEmail2) userDataToUpdate.referenceEmail2 = payloadData.referenceEmail2
        if(payloadData.referenceName1) userDataToUpdate.referenceName1 = payloadData.referenceName1
        if(payloadData.referenceName2) userDataToUpdate.referenceName2 = payloadData.referenceName2
        if(payloadData.salary) userDataToUpdate.salary = payloadData.salary
        if(payloadData.skills) userDataToUpdate.skills = payloadData.skills

        let data = await updateData(Modal.Users, { _id: userData._id }, userDataToUpdate, { lean: true, new: true });
        resolve(data)
    })
}

function insertMultiple(collection, data){
    return new Promise((resolve, reject) => {
        Service.saveMultiple(collection, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length)
                    resolve(result);
                else resolve([])
            }
        });
    })
}

function getRequired(collection, criteria, project, option) {
    return new Promise((resolve, reject) => {
        Service.getData(collection, criteria, project, option, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length)
                    resolve(result);
                else resolve([])
            }
        });
    });
}

function updateData(collection, criteria, dataToUpdate, option) {
    return new Promise((resolve, reject) => {
        Service.findAndUpdate(collection, criteria, dataToUpdate, option, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        });
    });
}

function aggregatePopulate(collection, pipline, populate) {

    return new Promise((resolve, reject) => {
        Service.aggregateDataWithPopulate(collection, pipline, populate, (err, result) => {
            resolve(result)
        })
    });
}

function getCount(collection, criteria) {
    return new Promise((resolve, reject) => {
        Service.count(collection, criteria, (err, result) => {
            resolve(result);
        });
    });
}

function getRequiredPopulate(collection, criteria, project, option, populate) {
    return new Promise((resolve, reject) => {
        Service.populateData(collection, criteria, project, option, populate, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length)
                    resolve(result);
                else resolve([])
            }
        });
    });
}

async function imageUpload(image) {
    if (Array.isArray(image)) {
        return new Promise((resolve, reject) => {
            let imageData = [], len = image.length, count = 0;
            image.map((obj) => {
                UploadMultipart.uploadFilesOnS3(obj, (err, result) => {
                    count++;
                    imageData.push(result);
                    if (count === len)
                        resolve(imageData)
                })
            })
        });
    }
    else {
        return new Promise((resolve, reject) => {
            UploadMultipart.uploadFilesOnS3(image, (err, result) => {
                resolve(result)
            })
        });
    }
}

module.exports = {
    userRegisteration: userRegisteration,
    login: login,
    logout: logout,
    jobPosting: jobPosting,
    getIndustriesList: getIndustriesList,
    getJobRolesList: getJobRolesList,
    jobListing: jobListing,
    userListing: userListing,
    getStateList: getStateList,
    getCitiesList: getCitiesList,
    updateProfile: updateProfile,
    imageUpload: imageUpload,
    addUserExperiences: addUserExperiences
}