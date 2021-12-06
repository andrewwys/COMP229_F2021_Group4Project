let mongoose = require('mongoose');

//Create a model class
let surveyModel = mongoose.Schema({
    title: String,
    name: String,
    description: String,
    createdDate: Date,
    editedDate: Date,
    timesViewed: int,
	status: String,
	questions: [{
		questionTitle: String, 
		type: String,      // YN, SHORT
		responseY: int,    // number of Yes response
		responseN: int,    // number of No response
		responseText: [String]
	}],
},
{
    collection: "update"
});

module.exports = mongoose.model('Survey', surveyModel);