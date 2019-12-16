let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let WorkExperiences = new Schema({
    userId: { type: Schema.ObjectId, sparse: true, ref: 'Users' },
    companyName: { type: String, default: '', sparse: true },
    position: { type: String, default: '', sparse: true },
    startDate: { type: Number, default: 0, sparse: true },
    endDate: { type: Number, default: 0, sparse: true },
    description: { type: String, default: '', sparse: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
});

module.exports = mongoose.model('WorkExperiences', WorkExperiences);