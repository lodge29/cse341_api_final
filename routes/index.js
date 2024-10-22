const router = require('express').Router();
const homepageController = require('../controllers/homepage');
const passport = require('passport');

// swagger documentation
router.use('/', require('./swagger'));

// homepage: welcome message
router.get('/', homepageController.homepageRoute);

// router: users
router.use('/users', require('./users'));
// router: tasks
router.use('/tasks', require('./tasks'));

// login using github Oauth
router.get('/login', passport.authenticate('github'), (req, res) => {});

// logout
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;