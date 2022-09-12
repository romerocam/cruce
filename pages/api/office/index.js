import connectMongo from "../../../util/dbConnect";
import Office from "../../../models/Office";

export default async function handler(req, res) {
  const { method } = req;

  await connectMongo();

  switch (method) {
    case "GET":
      try {
        const offices = await Office.find({});
        res.status(200).json({
          success: true,
          data: offices,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      break;

    case "POST":
      try {
        const office = await Office.create(req.body);
        res.status(201).json({
          success: true,
          data: office,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
