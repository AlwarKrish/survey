const mongoose = require('mongoose');
const {Schema} = mongoose;   //same as
//Schema} = mongoose;
//mongoose used to assign types

const userSchema = new Schema ({
  googleId: String
});

module.exports = mongoose.model('users',userSchema);
