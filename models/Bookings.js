const mongoose = require('mongoose');

const { Schema } = mongoose;
const bookingSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  officeId: {
    type: Schema.Types.ObjectId,
    ref: 'Office',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

