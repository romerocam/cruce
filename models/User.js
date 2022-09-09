import mongoose from "mongoose";
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
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
    default: 'customer',
    enum: ['customer', 'admin', 'operator'],
  },  
  office: { // in case the user is an operator, then an office should be assigned.
    type: mongoose.Schema.Types.ObjectId,
    ref: "Office",
  }, 

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
