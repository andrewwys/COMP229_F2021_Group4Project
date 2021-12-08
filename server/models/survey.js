let mongoose = require('mongoose');

//Create a model class
let surveyModel = mongoose.Schema({
    title: String,
    name: String,
    description: String,
    createdDate: Date,
    editedDate: Date,
    timesViewed: Number,
	status: String,
	creatorName: String,
	creatorId: String,
	questions: Array
},
{
    collection: "update"
});

module.exports = mongoose.model('Survey', surveyModel);