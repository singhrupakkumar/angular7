let UniversalFunctions = require('../Utils/UniversalFunctions');
const TokenManager = require('../Lib/TokenManager');
const AuthBearer = require('hapi-auth-jwt2')
exports.plugin = {
    name: 'auth',
    register: async (server, options) => {
    server.register(AuthBearer)
        server.auth.strategy(UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.admin, 'jwt',
        { 
            key: UniversalFunctions.CONFIG.APP_CONSTANTS.SERVER.JWT_SECRET_KEY,          // Never Share your secret key
            validate: TokenManager.verifyToken,            // validate function defined above
            verifyOptions: { algorithms: [ 'HS256' ],ignoreExpiration:false } // pick a strong algorithm
        });
        server.auth.strategy(UniversalFunctions.CONFIG.APP_CONSTANTS.AUTH.user, 'jwt',
        { 
            key: UniversalFunctions.CONFIG.APP_CONSTANTS.SERVER.JWT_SECRET_KEY,          // Never Share your secret key
            validate: TokenManager.verifyToken,            // validate function defined above
            verifyOptions: { algorithms: [ 'HS256' ],ignoreExpiration:false } // pick a strong algorithm
        });
        

    }
};
