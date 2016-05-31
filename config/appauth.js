/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

const mongoose = require('mongoose');
const localAuth = require('./passport/local-auth');

const User = mongoose.model('User');

module.exports = function(app, passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        /*User.findById(id, function(err, user) {
            done(err, user);
        });*/

        done(null, {
            'id': 1000,
            'email': 'user@gmail.com',
            'name': 'App User'
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    localAuth(passport);
}