'use strict';

let Config = require('../Config');
let Jwt = require('jsonwebtoken');
let async = require('async');
let Modal = require('../Models');
let Service = require('../Services').queries;
let mongoose = require('mongoose');
const UniversalFunctions = require('../Utils/UniversalFunctions');

let getTokenFromDB = function (userId, userType, flag, token, callback) {

    let userData = null;
    let criteria = {
        _id: mongoose.Types.ObjectId(userId),
        accessToken: token
    };

    async.series([
        function (cb) {
            if (userType === Config.APP_CONSTANTS.DATABASE.USER_TYPE.USER) {
                Service.getData(Modal.Users, criteria, {}, { lean: true }, function (err, dataAry) {
                    if (err) {
                        callback(err)
                    } else {
                        if (dataAry && dataAry.length > 0) {
                            userData = dataAry[0];
                            if (userData && userData._id) {
                                userData.id = userData._id;
                            }
                            cb(null, { userData: userData })
                        } else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }
                    }

                });

            }
            else if (userType === Config.APP_CONSTANTS.DATABASE.USER_TYPE.ADMIN && flag == "ADMIN") {
                Service.getData(Modal.AdminUsers, criteria, {}, { lean: true }, function (err, dataAry) {
                    if (err) {
                        cb(err)
                    } else {
                        if (dataAry && dataAry.length > 0) {
                            userData = dataAry[0];
                            cb();
                        } else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }
                    }

                });
            }
            else {
                cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
    ], function (err, result) {
        if (err) {
            callback(err)
        } else {
            if (userData && userData._id) {
                userData.id = userData._id;
                userData.type = userType;
            }
            callback(null, { userData: userData })
        }
    });


};

let setTokenInDB = function (userId, userType,tokenTime, tokenToSave, callback) {
    let criteria = {
        _id: userId
    };
    let setQuery = {
        accessToken: tokenToSave,
        tokenTime:tokenTime
    };
    let dataToSend;
    async.series([
        function (cb) {
            if (userType === Config.APP_CONSTANTS.DATABASE.USER_TYPE.USER) {
                Service.findAndUpdate(Modal.Users, criteria, setQuery, { new: true, lean: true }, function (err, dataAry) {
                    if (err) {
                        cb(err)
                    } else {
                        if (dataAry && dataAry._id) {
                            dataToSend = dataAry;
                            cb()
                        } else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
                        }
                    }
                });

            }
            else if (userType === Config.APP_CONSTANTS.DATABASE.USER_TYPE.ADMIN) {
                Service.findAndUpdate(Modal.Admins, criteria, setQuery, { new: true, lean: true }, function (err, dataAry) {
                    if (err) {
                        cb(err)
                    } else {
                        if (dataAry && dataAry._id) {
                            dataToSend = dataAry;
                            cb()
                        } else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
                        }
                    }
                });
            }

            else {
                cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
    ], function (err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null, dataToSend)
        }
    });



};

let verifyToken = async function (token, flag, callback) {

    let user;
	try{
		if (token.type === UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.USER_TYPE.ADMIN) {
			user = await getRequired(Modal.Admins, {_id: mongoose.Types.ObjectId(token._id)}, {__v: 0, password: 0}, {lean: true});
		} else if (token.type === UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.USER_TYPE.USER) {
			user = await getRequired(Modal.Users, {_id: mongoose.Types.ObjectId(token._id)}, {__v: 0}, {lean: true});
		}
	}catch(err){
        console.log(err)
	}
	// if (!!user && !!user._id) {
    if (user && user.length > 0) {
		return {
			isValid: true,
			credentials: user
		};
	}
	else {
		return {
			isValid: false
		};
		//throw ResponseManager.sendError("en", RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED);
	}


};

let setToken = function (tokenData, callback) {
    if (!tokenData._id && !tokenData.type) {
        callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    } else {

        let tokenToSend = Jwt.sign(tokenData, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY);
        setTokenInDB(tokenData._id, tokenData.type,tokenData.tokenTime,  tokenToSend, function (err, data) {
            callback(null, data)

        })
    }
};

let decodeToken = function (token, callback) {
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decodedData) {
        if (err) {
            callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN);
        } else {
            callback(null, decodedData)
        }
    })
};

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


module.exports = {
    setToken: setToken,
    verifyToken: verifyToken,
    decodeToken: decodeToken
};
