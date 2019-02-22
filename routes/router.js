const Authentication = require('../controllers/athentication');
const passport = require('passport');

const requireJWT = passport.authenticate('jwt', {session:false});
const SinginAuth = passport.authenticate('local',{session:false});

module.exports = app=> {
  //Signin and Signup route
  app.post('/signin', SinginAuth, Authentication.signin);
  app.post('/signup', Authentication.signup);

  //Auth req test that requried jwt
  app.get('/testauth', requireJWT, function(req,res) {
    res.send({sucess:'auth'});
  });

  //Google OAuth route
  app.get(
    "/auth/google",
    passport.authenticate("google", { 
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req,res) => {
      res.redirect('/landing');
    }
  );

  //Facebook
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      session: false,
      scope: "email"
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: '/' }),
    (req,res) => {
      res.redirect('/landing');
    }
  );

  //LinkedIn
  app.get(
    "/auth/linkedin",
    passport.authenticate("linkedin", { state: 'SOME STATE'  })
  );

  app.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", { failureRedirect: '/' }),
    (req,res) => {
      res.redirect('/landing');
    }
  );

  //Github
  app.get(
    "/auth/github",
    passport.authenticate("github")
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: '/' }),
    (req,res) => {
      res.redirect('/landing');
    }
  );
  //Logout route for Oauth
  app.get("/api/logout", (req, res) => {
    console.log('bye');
    req.logout();
    res.redirect('/');
    });
  
  //req.user returned from oauth for 'oauth' state
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
}