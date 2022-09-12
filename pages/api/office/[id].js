import connectMongo from "../../../util/dbConnect";
import Office from "../../../models/Office";

export default async function handler(req, res) {
  const { method } = req;
  const officeId = req.query.id;

  await connectMongo();

  switch (method) {
    case "GET":
      try {
        const office = await Office.findOne({_id: officeId});
        res.status(200).json({
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
