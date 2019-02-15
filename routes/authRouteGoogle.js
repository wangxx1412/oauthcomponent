const passport = require("passport");
const Authentication = require('../controllers/athentication');


module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { 
      session: false,
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: '/' }),
    (req,res) => {
      const jwtoken = Authentication.generateJWT(req.user);
      console.log(jwtoken);
      res.cookie('auth', jwtoken);
      res.redirect('/landing');
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};