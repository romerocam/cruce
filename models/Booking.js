//const mongoose = require("mongoose");
import mongoose from "mongoose";

//TODO: move this function to utils
// To validate if the time format is correct

const timeValidator = {
  validator: (value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
  message:
    "Time must be in the format hh:mm and be a valid time of the day (being hh a number from 00 to 23 and mm a number from 00 to 59)",
};


const { Schema } = mongoose;
const bookingSchema = new Schema({
  // _id: {
  //   type: Number,
  //   required: true,
  // },
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    validate: timeValidator,
  }, // NO FUNCIONA CON EL VALIDATE
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Office",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendance: {
    type: String,
    default: "pending",
    enum: ["pending", "present", "absent"],
    // required: true,
  },
});

module.exports =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

/*
Exportado asi se rompe el servidor en la 2da query de booking:

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
*/
