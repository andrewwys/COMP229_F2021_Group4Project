let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

//helper function for guard purposes - guarding the root
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// connect to our Book Model
let Contact = require('../models/businessContact');

let contactController = require('../controllers/businessContact');
const contact = require('../models/businessContact');

/* GET Route for the Book List page - READ Operation */
router.get('/', contactController.displayContactList);

/* GET Route for displaying the Add Page - Create Operation */
router.get('/add', requireAuth, contactController.displayAddPage);

/* POST Post for processing the Add Page - Create Operation */
router.post('/add', requireAuth, contactController.processAddPage);

/* GET Route for displaying the Edit Page - UPDATE Operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* POST Post for processing the Edit Page - UPDATE Operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;