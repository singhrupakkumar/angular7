
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let Industries = new Schema({
    name: { type: String, trim: true, sparse: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
});

module.exports = mongoose.model('Industries', Industries);