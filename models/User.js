import mongoose from "mongoose";
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  dni: Number,
  address: String,
  password: {
    type: String,
    required: true,
    // minlength: 7,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: true,
    lowerCase: true,
    validate: [isEmail, "enter valid email"],
},
  roles: {
    type: String,
    default: 'guest',
    enum: ['guest', 'admin', 'operator'],
  },  
  operator: String,
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
},
{ versionKey: false }
);
// UserSchema.methods.generateAuthToken = async function() {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, 'mySecret');
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

// UserSchema.pre('save', async function(next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
