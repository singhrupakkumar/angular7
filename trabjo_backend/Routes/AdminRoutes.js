const Joi = require('@hapi/joi');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Controller = require('../Controllers');
const Config = require('../Config');

module.exports = [
    {
        method: 'POST',
        path: '/admin/login',
        config: {
            handler: async function (request, h) {
                try {
                    const loginAdmin = await Controller.AdminController.adminLogin(request.payload)
                    return (UniversalFunctions.sendSuccess(null, loginAdmin))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'admin login api',
            notes: 'admin login api',
            tags: ['api', 'admin'],
            validate: {
                payload: {
                    email: Joi.string().lowercase().required(),
                    password: Joi.string().required(),
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/admin/directories',
        config: {
            handler: async function (request, h) {
                try {
                    const addDirectory = await Controller.AdminController.addDirectories(request.payload)
                    return (UniversalFunctions.sendSuccess(null, addDirectory))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'admin directory add api',
            notes: 'admin directory add api',
            tags: ['api', 'admin'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.admin,
            payload: {
                maxBytes: 200000000,
                parse: true,
                output: 'file',
                timeout: false
            },
            validate: {
                payload: {
                    nameEn: Joi.string().required(),
                    nameAr: Joi.string().required(),
                    image: Joi.any().meta({ swaggerType: 'file' }),
                    urlEn: Joi.string().required(),
                    urlAr: Joi.string().required(),
                },
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/admin/channel',
        config: {
            handler: async function (request, h) {
                try {
                    console.log("request.payloadrequest.payload",request.payload)
                    const addChannel = await Controller.AdminController.addChannel(request.payload)
                    console.log("addChannelsaddChannels",addChannel)
                    return (UniversalFunctions.sendSuccess(null, addChannel))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'admin channel add api',
            notes: 'admin channel add api',
            tags: ['api', 'admin'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.admin,
            payload: {
                maxBytes: 200000000,
                parse: true,
                output: 'file',
                timeout: false
            },
            validate: {
                payload: {
                    name: Joi.string().required(),
                    image: Joi.any().meta({ swaggerType: 'file' }),
                },
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
]