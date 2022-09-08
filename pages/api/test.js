// import { MongoClient } from "mongodb";



// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const data = req.body;

//     const client = await MongoClient.connect(
//       "mongodb+srv://username:password@cluster0.p7wad6v.mongodb.net/?retryWrites=true&w=majority"
//     );
//     const db = client.db();
//     const bookingsCollection = db.collection("collection name");
//     const result = await bookingsCollection.insertOne(data);
//     client.close();
//     res.status(201).json({ message: "User Inserted" });
//   }
// }
