let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let Jobs = new Schema({
    industryId: { type: Schema.ObjectId, sparse: true, ref: 'Industries' },
    jobRoleId: { type: Schema.ObjectId, sparse: true, ref: 'JobRoles' },
    jobType: { type: String, trim: true, sparse: true },
    salary: { type: String, trim: true, sparse: true },
    englishLevel: { type: String, trim: true, sparse: true },
    verify: { type: String, trim: true, sparse: true },
    hours: { type: String, trim: true, sparse: true },
    experiences: { type: String, trim: true, sparse: true },
    vacanciesNumber: { type: Number, trim: true, sparse: true },
    location: { type: String, trim: true, sparse: true },
    skills: { type: Array, trim: true, sparse: true },
    description: { type: String, trim: true, sparse: true },
    file: { type: String, trim: true, sparse: true },
    createdBy : { type: Schema.ObjectId, sparse: true, ref: 'Users' },
    applicants : [{ type: Schema.ObjectId, sparse: true, ref: 'Users' }],
    startDate: { type: Number },
    endDate: { type: Number },
    spanishTranslationNeeded: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
});

module.exports = mongoose.model('Jobs', Jobs);