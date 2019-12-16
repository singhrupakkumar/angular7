const Config = require('./Config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Hapi = require('@hapi/hapi');
const Plugins = require('./Plugins');
const Routes = require('./Routes');

(async initServer => {
	try {
        const server = new Hapi.Server({
            routes: { cors: true },
            port: Config.dbConfig.config.PORT,
        });

        mongoose.connect(Config.dbConfig.config.dbURI,{ useNewUrlParser: true,useFindAndModify: false }, function (err) {
            if (err) {
                console.log("DB Error: ", err);
                process.exit(1);
            } else {
                console.log('MongoDB Connected');
            }
        });


        await server.register(Plugins);

        await server.route(Routes);

        await server.start();

        server.events.on('response', function (request) {
            console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.statusCode);
        });

    }catch (error) {
		console.log('6666666666666666', error);
		// Logger.error(error);
	}
})();