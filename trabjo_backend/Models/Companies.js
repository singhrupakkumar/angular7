
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let Companies = new Schema({
    name: { type: String, trim: true, sparse: true },
    email: { type: String, default: '', sparse: true },
    countryCode: { type: String, default: '', sparse: true },
    phoneNumber: { type: String, default: '', sparse: true },
    address:{ type: String, default: '', sparse: true },
    zipcode: { type: String, default: '', sparse: true },
    cityId: { type: Schema.ObjectId, sparse: true, ref: 'Cities' },
    stateId: { type: Schema.ObjectId, sparse: true, ref: 'States' },
    countryId: { type: Schema.ObjectId, sparse: true, ref: 'Countries' },
    image: {
        original: { type: String, default: "" },
        thumbnail: { type: String, default: "" },
    },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
});

module.exports = mongoose.model('Companies', Companies);