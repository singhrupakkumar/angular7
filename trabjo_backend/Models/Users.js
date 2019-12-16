
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let Users = new Schema({
    name: { type: String, trim: true, sparse: true },
    email: { type: String, default: '', sparse: true },
    password: { type: String, default: '', sparse: true },
    countryCode: { type: String, default: '', sparse: true },
    phoneNumber: { type: String, default: '', sparse: true },
    dob: { type: Number, default: 0, sparse: true },
    address:{ type: String, default: '', sparse: true },
    address1:{ type: String, default: '', sparse: true },
    zipcode: { type: String, default: '', sparse: true },
    cityId: { type: Schema.ObjectId, sparse: true, ref: 'Cities' },
    stateId: { type: Schema.ObjectId, sparse: true, ref: 'States' },
    countryId: { type: Schema.ObjectId, sparse: true, ref: 'Countries'},
    image: {
        original: { type: String, default: "" },
        thumbnail: { type: String, default: "" },
    },
    experienced: { type: Boolean, default: 'false' },
    experiences: [{ type: Schema.ObjectId, sparse: true, ref: 'WorkExperiences' }],
    references: [{
        name: { type: String, default: '', sparse: true },
        email: { type: String, default: '', sparse: true },
    }],
    resume: { type: String, default: '', sparse: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deviceToken: { type: String, trim: true, default: '' },
    accessToken: { type: String, trim: true, sparse: true },
    accountType: {
        type: String, trim: true, index: true, enum: [
            Config.APP_CONSTANTS.USER_TYPES.EMPLOYEE,
            Config.APP_CONSTANTS.USER_TYPES.EMPLOYER,
        ]
    },
    referenceEmail1:{ type: String, trim: true, sparse: true },
    referenceEmail2:{ type: String, trim: true, sparse: true },
    referenceName1:{ type: String, trim: true, sparse: true },
    referenceName2:{ type: String, trim: true, sparse: true },
    resume:{ type: String, trim: true, sparse: true },
    salary:{ type: String, trim: true, sparse: true },
    skills: { type: Array, trim: true, sparse: true },
    organisationPart:{ type: String, default:"0" },
    organisationDetails :{
        name: { type: String, trim: true, sparse: true },
        designation: { type: String, trim: true, sparse: true },
        phoneNumber: { type: String, default: '', sparse: true },
        address:{ type: String, default: '', sparse: true },
        address1:{ type: String, default: '', sparse: true },
        zipcode: { type: String, default: '', sparse: true },
        cityId: { type: Schema.ObjectId, sparse: true, ref: 'Cities' },
        stateId: { type: Schema.ObjectId, sparse: true, ref: 'States' },
    },
    tokenTime: { type: Number, default: 0, sparse: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
});

module.exports = mongoose.model('Users', Users);