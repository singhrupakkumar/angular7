const Config = require('../Config');
const Service = require('../Services').queries;
const TokenManager = require('../Lib/TokenManager');
const Modal = require('../Models');
const UniversalFunctions = require('../Utils/UniversalFunctions');

async function adminLogin(payloadData) {

    let f1 = login(payloadData);
    let f2 = tokenUpdate(await f1);
    return await f2;
}
async function login(payloadData) {
    return new Promise((resolve, reject) => {
        let tokenData = {};
        let getCriteria = {
            email: payloadData.email,
        };
        Service.getData(Modal.Admins, getCriteria, {}, { lean: true }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                if (!data || data.length <= 0) {
                    reject(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_EMAIL);
                }
                else {
                    if (data && data[0].password !== UniversalFunctions.CryptData(payloadData.password)) {
                        reject(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_PASSWORD);
                    } else {
                        tokenData = data[0];
                        tokenData.type = UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.USER_TYPE.ADMIN;
                        resolve(tokenData);
                    }
                }
            }
        });
    });
}

function tokenUpdate(tokenData) {
    return new Promise((resolve, reject) => {
        TokenManager.setToken({ _id: tokenData._id, type: tokenData.type }, function (err, output) {
            if (err) {
                reject(err)
            } else {
                tokenData.accessToken = output.accessToken;
                resolve(tokenData);
            }
        });
    });
}

async function addDirectories(payloadData) {
    return new Promise(async (resolve, reject) => {
        let dataToSave = {};

        payloadData.nameEn ? dataToSave.name.en = payloadData.nameEn : dataToSave.name.en = ""
        payloadData.nameAr ? dataToSave.name.ar = payloadData.nameAr : dataToSave.name.ar = ""

        payloadData.urlEn ? dataToSave.url.en = payloadData.urlEn : dataToSave.url.en = ""
        payloadData.urlAr ? dataToSave.url.ar = payloadData.urlAr : dataToSave.url.ar = ""

        // if (payloadData.image) dataToSave.image = payloadData.image;

        let Directories = await createData(Modal.Directories, dataToSave)
        resolve(Directories)
    });
}

async function addChannel(payloadData) {
    return new Promise(async (resolve, reject) => {
        let dataToSave = {
            name: payloadData.name,
        };

        console.log("dataToSavedataToSave",dataToSave)
        // if (payloadData.image) dataToSave.image = payloadData.image;

        let channel = await createData(Modal.Channels, dataToSave)
        resolve(channel)
    });
}

function createData(collection, dataToSave) {
    return new Promise((resolve, reject) => {
        Service.saveData(collection, dataToSave, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        });
    });
}

module.exports = {
    adminLogin: adminLogin,
    addDirectories: addDirectories,
    addChannel: addChannel
}