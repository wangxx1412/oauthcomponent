const passport = require("passport");
const token = require('../token');

module.exports = app => {
  app.get(
    "/auth/github",
    passport.authenticate("github", {
      session: false,
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: '/' }),
    (req,res) => {
      const jwtoken = token(req.user);
      res.cookie('auth', jwtoken);
      res.redirect('/landing');
    }
  );
};