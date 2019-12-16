'use strict';
if (process.env.NODE_ENV === 'dev') {
    exports.config = {
        PORT: 8000,
        dbURI: 'mongodb://jobpostdbuser:s&dyd&3ukjJHJdhjd&hsd@localhost/jobpostdb'
    }
}
else {
    exports.config = {
        PORT: 8000,
        dbURI: 'mongodb://localhost/job-posting'
    };
}