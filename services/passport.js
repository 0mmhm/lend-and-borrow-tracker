const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log('from serializeUser: ' + user.id)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        // console.log('access token', accessToken);
        // console.log('refresh token', refreshToken);
        // console.log('profile', profile);
        let { id, displayName, emails } = profile;

        User.findOne({googleId: profile.id}).then((existingUser) => {
            if(existingUser) {
                // old user
                done(null, existingUser);
            }
            else {
                // new user
                new User({ 
                    googleId: id,
                    name: displayName,
                    email: emails[0].value
                })
                .save()
                .then(user => done(null, user));
            }
        });
    })
);