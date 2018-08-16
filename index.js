const express = require("express");
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
/*const passportConfig = */ require("./services/passport"); //we can condense as it it is not goint to do anything
//const authRoutes = require("./routes/authroutes");
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI).then(() => {
       console.log('connected to mongo'); // if all is ok we will be here
    })
    .catch(err => { // we will not be here...
        console.error('App starting error:', err.stack);
    });
/*mongoose.connect('keys.mongoURI');  //shouldnt commit to git hub*/
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000, //last 30 days before expire automatically
    keys: [keys.cookieKey]  //to prevent from commiting it to github
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); //completely valid java code
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production'){
  // Express will serve up production assests
  //like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  //express will server the index.html
  //if it doesnt recognize the authRoutes

    const path = require('path');
    app.get('*',(req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
