const passport = require('passport'); // original passport npm module

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    '/auth/google/callback',
     passport.authenticate('google'),
     (req,res) => {
       res.redirect("/surveys");  //if the callback route is encounter it redirects to the surveys route
     }
   );   // this specifies the google strategy ** this has na internal vallling name..

  app.get('/api/logout', (req,res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req,res) => {
    res.send(req.user);    //now who have logined can have access
  });

};
