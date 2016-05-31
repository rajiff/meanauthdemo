/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

require('../../app/users/user.js');

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('User');

module.exports = function(passport) {

    var options = {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    };

    // var signin = function(req, email, password, done) {
    //     // check in mongo if a user with email exists or not      
    //     User.findOne({
    //             'email': email
    //         },
    //         function(err, user) {
    //             if (err)
    //                 return done(err, false, {
    //                     'message': 'Invalid..! username or crdentials not matched.'
    //                 });
    //             if (!user) {
    //                 return done(null, false, {
    //                     'message': 'Invalid..! username or crdentials not matched.'
    //                 });
    //             }
    //             if (!user.authenticate(password)) {
    //                 return done(null, false, {
    //                     'message': 'Invalid..! username or crdentials not matched.'
    //                 });
    //             }
    //             return done(null, user);
    //         }
    //     );
    // };

    var signin = function(req, email, password, done) {
        if (email == 'user@gmail.com') {
            return done(null, {
                'id': 1000,
                'email': 'user@gmail.com',
                'name': 'App User'
            });
        } else {
            return done(null, false, {
                'error': 'Invalid username or crdentials not matched..!'
            });
        }

    };

    passport.use('local-signin',
        new LocalStrategy(options, signin)
    );
};