const CONFIG = require('../Config');
const Boom = require('@hapi/boom');
const MD5 = require('md5');
const Joi = require('@hapi/joi');

const CryptData = function (stringToCrypt) {
    return MD5(MD5(stringToCrypt));
};

const failActionFunction = function (request, reply, source, error) {

    console.log("..............err...........fail action.................", request.payload);
    let customErrorMessage = '';
    if (error.output.payload.message.indexOf("[") > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
    } else {
        customErrorMessage = error.output.payload.message;
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    error.output.payload.message = customErrorMessage;
    delete error.output.payload.validation;
    return reply(error);
};

const sendSuccess = function (successMsg, data) {
    successMsg = successMsg || CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT.customMessage;
    if (typeof successMsg === 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')) {
        return { statusCode: successMsg.statusCode, message: successMsg.customMessage, data: data || null };
    } else {
        return { statusCode: 200, message: successMsg, data: data || null };
    }
};

const sendError = function (data) {
    var error
    if (typeof data === 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {
        error = new Error(data.customMessage);
        let errorToSend = Boom.boomify(error, { statusCode: data.statusCode });

        errorToSend.output.payload.responseType = data.type;
        return errorToSend;
    } else {
        let errorToSend = '';
        if (typeof data === 'object') {
            if (data.name === 'MongoError') {
                errorToSend += CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.DB_ERROR.customMessage;
                if (data.code = 11000) {
                    let duplicateValue = data.errmsg && data.errmsg.substr(data.errmsg.lastIndexOf('{ : "') + 5);
                    duplicateValue = duplicateValue.replace('}', '');
                    errorToSend += CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.DUPLICATE.customMessage + " : " + duplicateValue;
                    //console.log("==================errorToSend==================",data.message)
                    if (data.message.indexOf('email_1') > -1) {
                        errorToSend = CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.DUPLICATE_EMAIL.customMessage;
                    }
                }
            } else if (data.name === 'ApplicationError') {
                errorToSend += CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.APP_ERROR.customMessage + ' : ';
            } else if (data.name === 'ValidationError') {
                errorToSend += CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.APP_ERROR.customMessage + data.message;
            } else if (data.name === 'CastError') {
                errorToSend += CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.DB_ERROR.customMessage + CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_ID.customMessage + data.value;
            }
        } else {
            errorToSend = data
        }
        let customErrorMessage = errorToSend;
        if (typeof customErrorMessage === 'string') {
            if (errorToSend.indexOf("[") > -1) {
                customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
            }
            customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace('[', '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace(']', '');
        }

        error = new Error(customErrorMessage);
        return Boom.boomify(error, { statusCode: 400 });
    }
};

const authorizationHeaderObj = Joi.object({
    authorization: Joi.string().required()
}).unknown();

module.exports = {
    failActionFunction: failActionFunction,
    sendSuccess: sendSuccess,
    sendError: sendError,
    CryptData: CryptData,
    CONFIG:CONFIG,
    authorizationHeaderObj:authorizationHeaderObj
}