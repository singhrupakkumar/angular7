const Joi = require('@hapi/joi');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Controller = require('../Controllers');
const Config = require('../Config');

module.exports = [
    {
        method: 'POST',
        path: '/user/userRegisteration',
        config: {
            handler: async function (request, h) {
                try {
                    const register = await Controller.UserController.userRegisteration(request.payload)
                    return (UniversalFunctions.sendSuccess(null, register))
                } catch (err) {
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'user register ',
            notes: 'sign up api',
            tags: ['api', 'user'],
            validate: {
                payload: {
                    name: Joi.string().optional(),
                    // countryCode: Joi.string().optional(),
                    phoneNumber: Joi.number().optional(),
                    password: Joi.string().required(),
                    email: Joi.string().required(),
                    type: Joi.string().valid([
                        Config.APP_CONSTANTS.USER_TYPES.EMPLOYEE,
                        Config.APP_CONSTANTS.USER_TYPES.EMPLOYER,
                    ]),
                    experienced: Joi.boolean().required(),
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
        path: '/user/login',
        config: {
            handler: async function (request, h) {
                try {
                    console.log("request.payloadrequest.payload", request.payload)
                    const loginUser = await Controller.UserController.login(request.payload)
                    return (UniversalFunctions.sendSuccess(null, loginUser))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'Login',
            notes: 'sign up api',
            tags: ['api', 'user'],
            validate: {
                payload: {
                    email: Joi.string().min(1).max(140).lowercase().required(),
                    password: Joi.string().min(1).max(140).required(),
                    // deviceToken: Joi.string().min(1).max(300).optional(),

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
        method: 'GET',
        path: '/user/logout',
        config: {
            handler: async function (request, h) {
                try {
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const logout = await Controller.UserController.logout(userData)
                    return (UniversalFunctions.sendSuccess(logout))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'logout',
            notes: 'logout api',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                query: {
                    // email: Joi.string().min(1).max(140).lowercase().required(),
                    // password: Joi.string().min(1).max(140).required(),
                    // deviceToken: Joi.string().min(1).max(300).optional(),

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
        path: '/user/jobPosting',
        config: {
            handler: async function (request, h) {
                try {
                    console.log("request.payloadrequest.payload", request.payload)
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const jobPosting = await Controller.UserController.jobPosting(request.payload, userData)
                    return (UniversalFunctions.sendSuccess(null, jobPosting))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'Job Posting',
            notes: 'Job Posting api',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                payload: {
                    industryId: Joi.string().required(),
                    jobRoleId: Joi.string().required(),
                    jobType: Joi.string().required(),
                    salary: Joi.string().required(),
                    englishLevel: Joi.string().required(),
                    verify: Joi.boolean().optional(),
                    hours: Joi.string().required(),
                    experience: Joi.boolean().required(),
                    vacanciesNumber: Joi.number().required(),
                    startDate: Joi.number().required(),
                    endDate: Joi.number().required(),
                    location: Joi.string().required(),
                    skills: Joi.array().required(),
                    description: Joi.string().optional(),
                    spanishTranslationNeeded: Joi.boolean().optional(),
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
        method: 'GET',
        path: '/user/getIndustriesList',
        config: {
            handler: async function (request, h) {
                try {
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const industryList = await Controller.UserController.getIndustriesList(request.query)
                    return (UniversalFunctions.sendSuccess(null, industryList))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'get Industries List',
            notes: 'get Industries List api',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                query: {
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
        method: 'GET',
        path: '/user/getJobRolesList',
        config: {
            handler: async function (request, h) {
                try {
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const rolesList = await Controller.UserController.getJobRolesList(request.query)
                    return (UniversalFunctions.sendSuccess(null, rolesList))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'get Job Roles List',
            notes: 'get Job Roles List api',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                query: {
                    industryId: Joi.string().min(1).max(140).required(),
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
        method: 'GET',
        path: '/user/jobListing',
        config: {
            handler: async function (request, h) {
                try {
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const jobList = await Controller.UserController.jobListing(request.query, userData)
                    return (UniversalFunctions.sendSuccess(null, jobList))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'get Jobs List',
            notes: 'get Jobs List api',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                query: {
                    jobId: Joi.string().min(1).max(140).optional(),
                    skip: Joi.number().default(0).optional(),
                    limit: Joi.number().default(20).optional(),
                    type:Joi.number().valid([0,1]).optional().default(0).description("0:All Jobs, 1:Posted By Me")
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
        method: 'GET',
        path: '/user/userListing',
        config: {
            handler: async function (request, h) {
                try {
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const userList = await Controller.UserController.userListing(request.query, userData)
                    return (UniversalFunctions.sendSuccess(null, userList))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'get Users List',
            notes: 'get Users List api',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                query: {
                    userId: Joi.string().min(1).max(140).optional(),
                    skip: Joi.number().default(0).optional(),
                    limit: Joi.number().default(20).optional(),
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
        method: 'GET',
        path: '/user/getStateList',
        config: {
            handler: async function (request, h) {
                try {
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const stateList = await Controller.UserController.getStateList(request.query)
                    return (UniversalFunctions.sendSuccess(null, stateList))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'get States List',
            notes: 'get States List api',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                query: {
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
        method: 'GET',
        path: '/user/getCitiesList',
        config: {
            handler: async function (request, h) {
                try {
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const citiesList = await Controller.UserController.getCitiesList(request.query)
                    return (UniversalFunctions.sendSuccess(null, citiesList))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'get cities List',
            notes: 'get cities List api',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                query: {
                    stateId:Joi.string().min(1).max(140).required(),
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
        path: '/user/updateProfile',
        config: {
            handler: async function (request, h) {
                try {
                    console.log("request.payloadrequest.payload", request.payload)
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const updateProfile = await Controller.UserController.updateProfile(request.payload, userData)
                    return (UniversalFunctions.sendSuccess(null, updateProfile))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'Update Profile',
            notes: 'Update Profile api',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                payload: {
                    name: Joi.string().optional(),
                    email: Joi.string().optional(),
                    dob: Joi.number().optional(),
                    phoneNumber: Joi.string().optional(),
                    stateId: Joi.string().optional(),
                    cityId: Joi.string().optional(),
                    zipcode: Joi.string().optional(),
                    address: Joi.string().optional(),
                    address1: Joi.string().optional(),
                    companyName: Joi.string().optional(),
                    companyDesignation: Joi.string().optional(),
                    companyPhoneNumber: Joi.string().optional(),
                    companyStateId: Joi.string().optional(),
                    companyCityId: Joi.string().optional(),
                    companyZipcode: Joi.string().optional(),
                    companyAddress: Joi.string().optional(),
                    companyAddress1: Joi.string().optional(),
                    organisationPart: Joi.string().optional(),
                    experienced: Joi.boolean().optional(),
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
        path: '/user/imageUpload',
        config: {
            handler: async function (request, h) {
                try {
                    const imageUpload = await Controller.UserController.imageUpload(request.payload)
                    return (UniversalFunctions.sendSuccess(null, imageUpload))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'Upload Image',
            notes: 'upload image api',
            tags: ['api', 'admin'],
            payload: {
                maxBytes: 200000000,
                parse: true,
                output: 'stream',
                timeout: false
            },
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                payload: {
                    image: Joi.any().meta({ swaggerType: 'file' }),
                },
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: 'log'
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
        path: '/user/addUserExperiences',
        config: {
            handler: async function (request, h) {
                try {
                    console.log("request.payloadrequest.payload", request.payload)
                    let userData = request.auth && request.auth.credentials && request.auth.credentials[0];
                    const updateProfile = await Controller.UserController.addUserExperiences(request.payload, userData)
                    return (UniversalFunctions.sendSuccess(null, updateProfile))
                } catch (err) {
                    console.log("errerr", err)
                    return (UniversalFunctions.sendError(err));
                }
            },
            description: 'Add User Experiences',
            notes: 'Add User Experiences',
            tags: ['api', 'user'],
            auth: UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user,
            validate: {
                payload: {
                    experiences:Joi.any().optional(),
                    referenceEmail1:Joi.string().optional(),
                    referenceEmail2:Joi.string().optional(),
                    referenceName1:Joi.string().optional(),
                    referenceName2:Joi.string().optional(),
                    resume:Joi.string().optional(),
                    salary:Joi.string().optional(),
                    skills:Joi.any().optional(),
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