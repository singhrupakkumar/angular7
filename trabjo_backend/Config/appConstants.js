const SERVER = {
    APP_NAME: 'Job Posting App',
    JWT_SECRET_KEY: 'MaEHqzXzdWrCS6TS',
};

const AUTH = {
    user: "UserAuth",
    admin: "AdminAuth"
}

const USER_TYPES = {
    EMPLOYEE:"EMPLOYEE",
    EMPLOYER:"EMPLOYER"
}

const swaggerDefaultResponseMessages = {
    '200': {'description': 'Success'},
    '400': {'description': 'Bad Request'},
    '401': {'description': 'Unauthorized'},
    '404': {'description': 'Data Not Found'},
    '500': {'description': 'Internal Server Error'}
};

const DATABASE = {
    USER_TYPE: {
        ADMIN: 'ADMIN',
        USER: 'USER',
    },
}

const STATUS_MSG = {
    SUCCESS:{
        CREATED: {
            statusCode:200,
            customMessage : 'Created Successfully',
            type : 'CREATED'
        },
        DEFAULT: {
            statusCode:200,
            customMessage : 'Success',
            type : 'DEFAULT'
        },
        UPDATED: {
            statusCode:200,
            customMessage : 'Updated Successfully',
            type : 'UPDATED'
        },
        LOGOUT: {
            statusCode:200,
            customMessage : 'Logged Out Successfully',
            type : 'LOGOUT'
        },
        DELETED: {
            statusCode:200,
            customMessage : 'Deleted Successfully',
            type : 'DELETED'
        },
        REGISTER: {
            statusCode:200,
            customMessage : 'Register Successfully',
            type : 'REGISTER'
        },
    },
    ERROR:{
        TOKEN_EXPIRED: {
            statusCode:401,
            customMessage : 'Sorry, your account has been logged in other device! Please login again to continue.',
            type : 'TOKEN_ALREADY_EXPIRED'
        },
        BLOCKED: {
            statusCode:405,
            customMessage : 'This account is blocked by Admin. Please contact support team to activate your account.',
            type : 'BLOCKED'
        },
        IMP_ERROR: {
            statusCode:500,
            customMessage : 'Implementation error',
            type : 'IMP_ERROR'
        },
        INVALID_TOKEN: {
            statusCode:400,
            customMessage : 'The token you have entered does not match.',
            type : 'INVALID_TOKEN'
        },
        ALREADY_EXIST: {
            statusCode:400,
            customMessage : 'Email address you have entered is already registered with us.',
            type : 'ALREADY_EXIST'
        },
        INVALID_PASSWORD: {
            statusCode:400,
            customMessage : 'Password you have entered does not match.',
            type : 'INVALID_PASSWORD'
        },
    }
}

let APP_CONSTANTS = {
    swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
    STATUS_MSG:STATUS_MSG,
    SERVER:SERVER,
    DATABASE:DATABASE,
    AUTH:AUTH,
    USER_TYPES:USER_TYPES
};

module.exports = APP_CONSTANTS;
