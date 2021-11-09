let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Contact = require('../models/businessContact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('businessContact/list', {title: 'Contacts',
             ContactList: contactList,
             displayName: req.user ? req.user.displayName : ''});      
        }
    }).sort({"contactName":1});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('businessContact/add', {title: 'Add Contact'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "contactName": req.body.name,
        "contactNumber": req.body.contactNumber,
        "contactEmail": req.body.contactEmail,
        "businessName": req.body.businessName,
        "businessType": req.body.businessType,
        "createdDate": req.body.createdDate
    });

    Contact.create(newContact, (err, Contact) =>{
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

    Contact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('businessContact/edit', {title: 'Edit Contact', contact: contactToEdit,
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = Contact({
        "_id": id,
        "contactName": req.body.name,
        "contactNumber": req.body.contactNumber,
        "contactEmail": req.body.contactEmail,
        "businessName": req.body.businessName,
        "businessType": req.body.businessType,
        "createdDate": req.body.createdDate
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
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

    Contact.remove({_id: id}, (err) => {
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