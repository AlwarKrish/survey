const mongoose = require('mongoose');
const {Schema} = mongoose;   //same as
//Schema} = mongoose;
//mongoose used to assign types

const userSchema = new Schema ({
  googleId: String,
  credits: { type: Number, default: 0}
});

module.exports = mongoose.model('users',userSchema);
