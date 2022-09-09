import connectMongo from "../../util/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;
  const { email } = req.body;
  
  await connectMongo();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});

        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {        
        const user = await User.create(req.body);
        console.log(">>>>>", user);
        res
          .status(201)
          .json({
            success: true,
            data: user,
            message: `User has been created`,
          });
      } catch (error) {
        res
          .status(400)
          .json({
            success: false,
            data: error,
            message: `User has not been created`,
          });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
