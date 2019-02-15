const passport = require("passport");
const token = require('../token');

module.exports = app => {
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
      const jwtoken = token(req.user);
      res.cookie('auth', jwtoken);
      res.redirect('/landing');
    }
  );
};