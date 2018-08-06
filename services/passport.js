const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {  //used to follow up request
  done(null, user.id);  //we refer to mongo identifier rather than google id...so that we can handle multiple authentication services
});

passport.deserializeUser((id, done) => {
   // flushing out from the cookie
   User.findById(id)
   .then(user => {
     done(null, user);
   });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", //handle user comming back on th applcation
       //this deals with redirecting proxies
    },
    (accessToken, refreshToken, profile, done) => { //callback to the profile after being signed in
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if(existingUser) {
            done(null, existingUser);  //any error,user_record
            //Already have one
          }else{
            //Unique
            new User({ googleId: profile.id}).save()   //saving a record to mongodb is an asynchronous operation
              .then(user => done(null, user));
          }
        })
      //new User({ googleId: profile.id}).save(); //takes the instance and saves
      /*console.log('accessToken',accessToken);
      console.log('refresh token', refreshToken);
      console.log('Profile:',profile);*/
    }
  )
);
