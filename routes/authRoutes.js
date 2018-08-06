const passport = require('passport'); // original passport npm module

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));   // this specifies the google strategy ** this has na internal vallling name..

  app.get('/api/logout', (req,res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req,res) => {
    res.send(req.user);    //now who have logined can have access
  });

};
