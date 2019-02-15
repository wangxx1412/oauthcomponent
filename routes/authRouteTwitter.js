const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/twitter",
    passport.authenticate("twitter", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: '/' }),
    (req,res) => {
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