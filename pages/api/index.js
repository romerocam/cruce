import { connectToDataBase } from "../../util/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
        const data = req.body;
        const { db } = await connectToDataBase();
        const result = await db.collection("Users").insertOne(data);
        res.status(201).json({ message: "User Inserted" });
      }
  const { db } = await connectToDataBase();
  const data = await db.collection("Users").find().limit(10).toArray();
  res.json(data);
}
