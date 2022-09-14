import connectMongo from "../../../util/dbConnect";
import Office from "../../../models/Office";

export const getOffices = async function () {
  //TODO: close mongo connection
  connectMongo();
  const offices = await Office.find({});
  return offices;
};
export const createOffice = async function (office) {
  //TODO: close mongo connection
  connectMongo();
  const newOffice = await Office.create(office);
  return newOffice;
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const offices = await getOffices();
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
        const office = await createOffice(req.body);
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
