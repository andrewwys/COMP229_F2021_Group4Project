let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { updateMany } = require('../models/survey');

// let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);
            res.render('survey/list', {
                title: 'Group 4 Survey Site',
                SurveyList: surveyList,
                displayName: req.user ? req.user.displayName : ''
            });      
        }
    }).sort({"name": 1});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey'})          
}

module.exports.processAddPage = (req, res, next) => {
    let utcDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    let newSurvey = Survey({
        "title": req.body.title,
        "name": req.body.name,
        "description": req.body.description,
        "createdDate": utcDate,
        "editedDate": utcDate,
        "timesViewed": 1
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit', {
                title: 'Edit Survey', 
                survey: surveyToEdit,
                displayName: req.user ? req.user.displayName : ''
            });      
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let utcDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    let questionCounter = Number(req.body.questionCounter) + 1;
    let questionArray = [];
    let typeString = req.body.questionType;
    typeString = typeString.substring(0, typeString.length - 1);
    let typeArray = typeString.split(',');
    for (let i = 1; i < questionCounter; i++) {
        if(typeArray[i - 1] == "YN"){
            let questionObj = {
                questionTitle: req.body["question" + i],
                type: typeArray[i - 1]
            };
            questionArray.push(questionObj);
        }
        else
        {
            let questionObj = {
                questionTitle: req.body["question" + i],
                type: typeArray[i - 1]
            };
            questionArray.push(questionObj);
        }
    }

    let updatedSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "name": req.body.name,
        "description": req.body.description,
        "createdDate": req.body.createdDate,
        "editedDate": utcDate,
        "timesViewed": req.body.timesViewed,
        "questions": questionArray
    });

     Survey.updateOne({_id: id}, updatedSurvey, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the contact list
             res.redirect('/');
         }
     });
}


module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the contact list
             res.redirect('/');
        }
    });
}

module.exports.displaySurveyForm = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToFill) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the survey form view
            res.render('survey/surveyForm', {
                title: 'Survey Form', 
                displayName: req.user ? req.user.displayName : '',
                survey: surveyToFill
            });
        }
    });
}

module.exports.displayReportPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToFill) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the survey form view
            res.render('survey/report', {
                title: 'Report', 
                displayName: req.user ? req.user.displayName : '',
                survey: surveyToFill
            });      
        }
    });
}

module.exports.processSurveyForm = (req, res, next) => {
    let id = req.params.id;
    // let utcDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    let questionCounter = req.body.questionCounter;
    for (let i=0; i<questionCounter; i++) {
        // define response to YN question
        let responseYN = eval("req.body.responseYN" + i.toString());
        let responseY = responseYN? parseInt(responseYN) : 0;
        let responseN = responseYN? Math.abs(responseY-1) : 0;
        let responseText = eval("req.body.responseText" + i.toString());
        let updateQuery = {
            $inc: {
                "questions.$.responseY": responseY,
                "questions.$.responseN": responseN
            },
            $push: {
                "questions.$.responseText": responseText
            }
        };

        Survey.updateOne({_id: id, "questions.questionTitle": eval("req.body.qTitle" + i.toString()) }, updateQuery, (err) => {
            if(err) {
                console.log(err);
                res.end(err);
            } 
        });

        // eval("questionArray.push(req.body.question" + i + ");");
    }

    res.redirect('/');
}
