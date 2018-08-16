const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req,res) => {  //when ever the api is being called the requirelogin function gets called and executed.

    if(!req.user){
      return res.status(401).send({ error: 'You must login !! '});  //is the passport does not find a loggedin user then it sets the status as not found.
    }
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '5$ for 5 credits',
        source: req.body.id
      });
      req.user.credits+=5;
      const user = await req.user.save();  //only this statement saves to the database

      res.send(user); //send back the data back to the browser
  });
};
