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
	questions: [{
		questionTitle: String, 
		type: String,      // YN, SHORT
		responseY: Number,    // number of Yes response
		responseN: Number,    // number of No response
		responseText: [String]
	}],
	creatorId: String,
	creatorName: String
},
{
    collection: "update"
});

module.exports = mongoose.model('Survey', surveyModel);