import mongoose from "mongoose";

const OfficeSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: Number,
  capacityPerSlot: Number,
  timeRange: {
    from: Number,
    to: Number,
  },
  

},
{ versionKey: false }
);

module.exports = mongoose.models.Office || mongoose.model("Office", OfficeSchema);
