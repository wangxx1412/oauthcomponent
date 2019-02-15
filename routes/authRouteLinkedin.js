const passport = require("passport");
const token = require('../token');

module.exports = app => {
  app.get(
    "/auth/linkedin",
    passport.authenticate("linkedin", { state: 'SOME STATE'  })
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