let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let States = new Schema({
    name: { type: String, trim: true, sparse: true },
    countryId: { type: Schema.ObjectId, sparse: true, ref: 'Countries' },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
});

module.exports = mongoose.model('States', States);