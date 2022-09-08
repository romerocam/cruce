import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  dni: Number,
  address: String,
  password: {
    type: String,
    required: [true, "password required"],
  },
  email: {
    type: String,
  },
  roles: {
    type: String,
    enum: {
      values: ['user', 'admin', 'operator'],
      message: '{VALUE} is not supported'
    }
  } ,  
  operator: String,
},
{ versionKey: false }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
