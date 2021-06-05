
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
import Keys from "./Keys"

class GooglePassport {

    clientID: string;
    clientSecret: string;
    constructor(){

        this.clientID = Keys.clientID;
        this.clientSecret = Keys.clientSecret;

        passport.use(
            new GoogleStrategy({
                clientID: this.clientID,
                clientSecret: this.clientSecret,
                callbackURL: "/auth/google/callback"
            },
            function(req, token, tokenSecret, profile, done) {
                //User.findOrCreate({ googleId: profile.id }, function (err, user) {
                console.log(profile);
                return done(null, profile);
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
          });
          
          passport.deserializeUser(function(user, done) {
            done(null, user);
          });
    }
  
} export default GooglePassport;


