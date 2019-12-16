
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let JobRoles = new Schema({
    name: { type: String, trim: true, sparse: true },
    industryId: { type: Schema.ObjectId, sparse: true, ref: 'Industries' },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
});

module.exports = mongoose.model('JobRoles', JobRoles);