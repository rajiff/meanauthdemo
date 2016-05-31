/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

var authCtrlr = require('../app/auth/authctrlr');
var indexCtrlr = require('../app/index');

module.exports = function(app, passport) {

    var requireAuth = authCtrlr.isAuthenticated;

    app.post("/signup", function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Please retry with valid credentials input..!'
            });
        }

        next();

    }, authCtrlr.signup);

    //Overriding the default passport's way of redirecting, instead sending back a JSON object with appropriate HTTP status cpde
    app.post('/signin', function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Please retry with valid credentials input..!'
            });
        }

        passport.authenticate('local-signin', function(err, user, info) {
            if (err) {
                return res.status(500).json(err);
            }

            if (user) {
                //You can put your additional code if you want to do something here, like enhancing user object with more data etc.,
                return res.status(200).json(user);
            } else {
                return res.status(401).json(info);
            }
        })(req, res, next);
    });
    /*app.post("/signin", passport.authenticate('local-signin', {
        successRedirect: '/auth/success/callback',
        failureRedirect: '/auth/failed/callback',
        failureFlash: true
    }));*/
    app.get("/signout", requireAuth, authCtrlr.signout);

    /*app.get("/auth/success/callback", requireAuth, function(req, res) {
        console.log("req: ", req);
        res.send({
            'message': 'success'
        });
    });
    app.get("/auth/failed/callback", function(err, req, res) {
        console.log("error: ", err);
        res.send({
            'message': 'failed'
        });
    });*/

    app.get("/", indexCtrlr);
    app.get("/userprofile", requireAuth, function(req, res) {
        return {
            'email': 'user@gmail.com',
            'name': 'App User'
        };
    });


    // catch all 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error(req.url + ' Not Found');
        err.status = 404;

        console.log(err.status + " " + err.message);
        console.log(err);

        next(err);
    });

    // Error handler, which will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);

            console.log(err.status + " " + err.message);
            console.log(err);

            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);

        console.log(err.status + " " + err.message);
        console.log(err);

        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};