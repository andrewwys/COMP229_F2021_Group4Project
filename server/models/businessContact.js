let mongoose = require('mongoose');

//Create a model class
let contactModel = mongoose.Schema({
    contactName: String,
    contactNumber: String,
    contactEmail: String,
    businessName: String,
    businessType: String,
    createdDate: String
},
{
    collection: "contact"
});

module.exports = mongoose.model('Contact', contactModel);