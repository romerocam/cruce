
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

//TODO: move this function to utils
// To validate if the time format is correct
const timeValidator = {
    validator: (value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
    message:
        "Time must be in the format hh:mm and be a valid time of the day (being hh a number from 00 to 23 and mm a number from 00 to 59)",
};

const { Schema } = mongoose;
const VerificationTokenSchema = new Schema({
    // _id: {
    //     type: String,
    //     required: true,
    // },
    token: {
        type: String,
        required: true,
    },
    expires: {
        type: Timestamp,
        required: true,

    },
});

module.exports = mongoose.models.VerificationToken || mongoose.model("VerificationToken", VerificationTokenSchema);