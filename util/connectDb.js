import mongoose from "mongoose";
const { MONGODB_URI, MONGODB_DB } = process.env;

const connectDb = async () => mongoose.connect(MONGODB_URI);

export default connectDb;
