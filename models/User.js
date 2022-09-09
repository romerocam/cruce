import mongoose from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
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
    },
    roles: {
      type: String,
      default: "guest",
      enum: ["guest", "admin", "operator"],
    },
    operator: String,
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { versionKey: false }
);
// UserSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, "mySecret");
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cd(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this)
    }
  });
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
