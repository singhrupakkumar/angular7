
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let Cities = new Schema({
    name: { type: String, trim: true, sparse: true },
    stateId: { type: Schema.ObjectId, sparse: true, ref: 'States' },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
});

module.exports = mongoose.model('Cities', Cities);