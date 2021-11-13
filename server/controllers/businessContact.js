let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displayContactList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('businessContact/list', {title: 'Group 4 Survey Site',
             SurveyList: surveyList,
             displayName: req.user ? req.user.displayName : ''});      
        }
    }).sort({"name":1});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('businessContact/add', {title: 'Add Survey'})          
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
            res.redirect('/contact-list');
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
            res.render('businessContact/edit', {title: 'Edit Survey', survey: surveyToEdit,
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id
    let utcDate = new Date().toJSON().slice(0,10).replace(/-/g,'/')

    let updatedSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "name": req.body.name,
        "description": req.body.description,
        "createdDate": req.body.createdDate,
        "editedDate": utcDate,
        "timesViewed": req.body.timesViewed
    });
    console.log(updatedSurvey.timesViewed);

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contact-list');
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
             res.redirect('/contact-list');
        }
    });
}