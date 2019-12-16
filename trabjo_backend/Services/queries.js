
'use strict';

let saveData = function (model, data, callback) {
    new model(data).save((err, result) => {
        if (err) return callback(err);
        callback(null, result);

    })
};

let saveMultiple = function (model, data, callback) {
    model.insertMany(data, (err, data) => {
        if (err) return callback(err);
        else return callback(null, data);
    });
}

let getData = function (model, query, projection, options, callback) {

    model.find(query, projection, options, (err, data) => {
        if (err) return callback(err);
        else return callback(null, data);
    });
};

let getUniqueData = function (model, query, projection, options, keyName, callback) {

    model.find(query, projection, options).distinct(keyName, (err, data) => {
        if (err) return callback(err);
        else return callback(null, data);
    });
};

let findOne = function (model, query, projection, options, callback) {
    model.findOne(query, projection, options, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

let findAndUpdate = function (model, conditions, update, options, callback) {
    model.findOneAndUpdate(conditions, update, options, function (error, result) {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
};

let populateData = function (model, query, projection, options, collectionOptions, callback) {
    model.find(query, projection, options).populate(collectionOptions).exec(function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

let count = function (model, condition, callback) {
    model.count(condition, function (error, count) {
        if (error) return callback(error);
        return callback(null, count);
    })
};

let aggregateDataWithPopulate = function (model, group, populateOptions, callback) {
    model.aggregate(group, (err, data) => {

        if (err) {
            //logger.error("Aggregate Data", err);
            return callback(err);
        }

        model.populate(data, populateOptions,
            function (err, populatedDocs) {

                if (err) return callback(err);
                return callback(null, populatedDocs);// This object should now be populated accordingly.
            });
        //return callback(null, data);
    });
};

module.exports = {
    saveData: saveData,
    getData: getData,
    getUniqueData: getUniqueData,
    findOne: findOne,
    findAndUpdate: findAndUpdate,
    count: count,
    populateData: populateData,
    saveMultiple: saveMultiple,
    aggregateDataWithPopulate: aggregateDataWithPopulate
}