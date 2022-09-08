import { connectToDataBase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDataBase();
  console.log("connected to db", db);
  const data = await db.collection('Users').find().limit(2).toArray();
  console.log(data);
  res.json(data)
}
