let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let surveyController = require('../controllers/survey');

// let jwt = require('jsonwebtoken');
// let passport = require('passport');

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

/* GET Route for displaying the Add Page - Create Operation */
router.get('/add', requireAuth, surveyController.displayAddPage);

/* POST Post for processing the Add Page - Create Operation */
router.post('/add', requireAuth, surveyController.processAddPage);

/* GET Route for displaying the Edit Page - UPDATE Operation */
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);

/* POST Post for processing the Edit Page - UPDATE Operation */
router.post('/edit/:id', requireAuth, surveyController.processEditPage);

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, surveyController.performDelete);

/* GET to survey form */
router.get('/form/:id', surveyController.displaySurveyForm);

/* POST Route for survey form submission */
router.post('/form/:id', surveyController.processSurveyForm);

router.get('/report/:id', requireAuth, surveyController.displayReportPage);

module.exports = router;