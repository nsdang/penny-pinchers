var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

passport.use(
    new GoogleStrategy({
        consumerKey: "564003822012-0aco66ofiurr475kh7ss3u0qfhf0kfnq.apps.googleusercontent.com",
        consumerSecret: "RaGCyxyreeUJ-iCAme4DiRmC",
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {
        console.log(profile);
    }
));