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

/* GET home page. */
// router.get('/', indexController.displayHomePage);
router.get('/', surveyController.displaySurveyList);

/* GET home page. */
// router.get('/home', indexController.displayHomePage);
router.get('/home', surveyController.displaySurveyList);

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

/* GET about page. */
// router.get('/about', indexController.displayAboutPage);

/* GET products page. */
// router.get('/products', indexController.displayProductsPage);

/* GET services page. */
// router.get('/services', indexController.displayServicesPage);

/* GET contact page. */
// router.get('/contact', indexController.displayContactPage);

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

module.exports = router;
