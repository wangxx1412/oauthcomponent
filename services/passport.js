const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const config = require('../config/keys');
const mongoose = require('mongoose');
const keys = require('../config/dev');

const User = mongoose.model('User');

const localLogin = new LocalStrategy(
  {usernameField:'email'}, 
  function(email, password, done){
  User.findOne({"local.email": email}, function(err, user){
      if(err){return done(err);}
      if(!user){return done(null,false);}

      user.comparePassword(password, function(err, isMatch){
          if(err){return done(err);}
          if(!isMatch){return done(null, false);}
          return done(null, user);
      });
  });
});

passport.use(localLogin);

const jwtOptions = {
  jwtFromRequest : ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  User.findById(payload.id, function(err, user){
      if(err){return done(err,false);}

      if(user){
          done(null,user);
      } else{
          done(null,false);
      }
  });
});

passport.use(jwtLogin);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({
          method:'google',
          google: {
            id:profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            name:{
              familyName: profile.name.familyName,
              givenName: profile.name.givenName
            }
        }}).save();
        done(null, user);    
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const existingUser = await User.findOne({ "facebook.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        method:'facebook',
        facebook: {
          id:profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName,
          name:{
            familyName: profile.name.familyName,
            givenName: profile.name.givenName
          }
      }}).save();
      done(null, user);   
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: "/auth/github/callback"
    },
async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
      const existingUser = await User.findOne({ githubId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        method:'github',
        github: {
          id:profile.id,
          displayName: profile.displayName
      }}).save();
      done(null, user);  
    }
  )
);

passport.use(
  new LinkedinStrategy(
    {
      clientID: keys.linkedinClientID,
      clientSecret: keys.linkedinClientSecret,
      callbackURL: "/auth/linkedin/callback",
      scope: ['r_emailaddress', 'r_basicprofile'],
    }, 
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ linkedinId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    const user = await new User({
      method:'linkedin',
      linkedin: {
        id: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        name:{
          familyName: profile.name.familyName,
          givenName: profile.name.givenName
        }
    }}).save();
    done(null, user);  
}));


