var authctrlr = exports = module.exports = {};


authctrlr.signup = function() {

};

authctrlr.signout = function(req, res) {
    req.logout();
};

authctrlr.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
        return next();

    //Assuming root url is always the app initial state, which will check the user's auth status
    res.redirect('/');
};