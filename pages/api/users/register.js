import connectMongo from "../../../util/dbConnect";
import User from "../../../models/User";


/*
 * La ruta para registrarse deberia ser POST a /api/users/. /register deberia ser la ruta del
 * front donde se renderiza el formulario.
 * Por lo tanto puse el codigo de POST que esta aca en el index la ruta de creacion de users dentro de POST.
 */

export default async function handler(req, res) {
    const { method } = req;
    const reqBody = req.body;
    const email = reqBody.email;

    await connectMongo();

    switch (method) {
        case "POST":
            try {
                const existingUser = await User.findOne({ email: email })

                if (existingUser) res.status(409).json({ success: false, data: `user already exist` });

                const newUser = await User.create(reqBody)
                console.log(">>>>>", newUser)
                res.status(201).json({
                    success: true,
                    data: {
                        id: newUser._id,
                        email: newUser.email,
                    },
                    message: `User ${newUser.email} has been created`,
                })

            } catch (error) {
                res.status(400).json({
                    success: false,
                    data: error,
                    message: `User has not been created`,
                });
            }
            break;

        case "GET":
            try {
                res.sendStatus(400)
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