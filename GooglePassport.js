"use strict";
exports.__esModule = true;
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
var GooglePassport = /** @class */ (function () {
    function GooglePassport() {
        passport.use(new GoogleStrategy({
            clientID: "564003822012-0aco66ofiurr475kh7ss3u0qfhf0kfnq.apps.googleusercontent.com",
            clientSecret: "RaGCyxyreeUJ-iCAme4DiRmC",
            callbackURL: "/auth/google/callback"
        }, function (req, token, tokenSecret, profile, done) {
            //User.findOrCreate({ googleId: profile.id }, function (err, user) {
            console.log(profile);
            return done(null, profile);
        }));
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
    return GooglePassport;
}());
exports["default"] = GooglePassport;
