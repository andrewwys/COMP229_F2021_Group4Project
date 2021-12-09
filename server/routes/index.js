let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');
let surveyController = require('../controllers/survey');

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

// /* GET home page. */
router.get('/', indexController.displaySurveyList);

// /* GET home page. */
router.get('/home', indexController.displaySurveyList);


/* GET Route for displaying the Login Page */
router.get('/login', indexController.displayLoginPage);

/* POST Post for processing the Login Page*/
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register Page */
router.get('/register', indexController.displayRegisterPage);

/* POST Post for processing the Register Page*/
router.post('/register', indexController.processRegisterPage);

/* GET to perform logout */
router.get('/logout', indexController.performLogout);

router.get('/my-survey', indexController.displayMySurveyPage);

module.exports = router;
