import mongoose from "mongoose";

//TODO: move this function to utils
// To validate if the time format is correct
const timeValidator = {
  validator: (value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
  message:
    "Time must be in the format hh:mm and be a valid time of the day (being hh a number from 00 to 23 and mm a number from 00 to 59)",
};

// To validate that Starting time is earlier than Closing time.
function validateTimeRange(timeRange) {
  let fromHour = timeRange.from.split(":")[0];
  let toHour = timeRange.to.split(":")[0];
  let fromMinute = timeRange.from.split(":")[1];
  let toMinute = timeRange.to.split(":")[1];

  if (fromHour > toHour || (fromHour === toHour && fromMinute > toMinute)) {
    return false;
  }

  return true;
}

const OfficeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    capacityPerSlot: {
      type: Number,
      required: true,
      min: [1, "Only positive amounts allowed."],
    },    
    timeRange: {
      from: {
        type: String,
        validate:  timeValidator,
      },
      to: {
        type: String,
        validate: timeValidator,
      },
    },
  },
  { versionKey: false }
);

// Validate middleware
OfficeSchema.pre("validate", function (next) {
  if (!validateTimeRange(this.timeRange)) {
    next(new Error("Starting time must be earlier than closing time."));
  } else {
    next();
  }
});

module.exports =
  mongoose.models.Office || mongoose.model("Office", OfficeSchema);
