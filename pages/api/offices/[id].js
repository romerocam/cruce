import connectMongo from "../../../util/dbConnect";
import Office from "../../../models/Office";

export default async function handler(req, res) {
  const { method } = req;
  const officeId = req.query.id;
  const reqBody = req.body
  await connectMongo();

  switch (method) {
    case "GET":
      try {
        const office = await Office.findOne({ _id: officeId });
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

    case "PUT": // busca el office del officeId que viene por params y lo edita:
      try {

        /* 
         * Office.findOneAndUpdate(filter, updateInfo, option)
         * option = { new: true } hace que retorne el documento actualizado, por defecto
         * trae el anterior al update
         */

        const updatedOffice = await Office.findOneAndUpdate(
          { _id: officeId },
          reqBody,
          { new: true })

        // sino existe el user responde con 409 y un mensaje:
        if (!updatedOffice) res.status(404).json({ success: false, data: `office ${officeId} does not exist` })

        res.status(200).json(
          {
            success: true,
            data: updatedOffice,
            title: `Office Update`,
            message: `Office ${updatedOffice.name} has been updated`,
          })
      } catch (error) {
        res
          .status(400)
          .json({
            success: false,
            data: error,
            title: `Update Account`,
            message: `Office has not been updated`,
          });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
