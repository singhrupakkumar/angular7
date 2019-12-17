'use strict';
if (process.env.NODE_ENV === 'dev') {
    exports.config = {
        PORT: 8000,
        dbURI: 'mongodb://fdgdfgg:s&fgsdg&fdgsffdg&hsd@localhost/dfg'
    }
}
else {
    exports.config = {
        PORT: 8000,
        dbURI: 'mongodb://localhost/job-posting'
    };
}