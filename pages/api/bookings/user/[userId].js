import Office from "../../../../models/Office"
import { getSession } from "next-auth/react";
import connectMongo from "../../../../util/dbConnect";
import Booking from "../../../../models/Booking";
import { ObjectId } from "mongodb"; 

export default async function handler(req, res) {
    const { method } = req;
    const reqBody = req.body;
    const userId = req.query.userId;

    // verifica que el usuario este logeado:
    // const session = await getSession({ req: req });
    // if (!session) res.status(401).json({ message: 'Not Authenticated!' }); // return implicito

    await connectMongo();

    switch (method) {
        case "GET": // busca los bookings del usuario pasado por params:
            try {
                const foundBookingsUser = await Booking.find({ user: ObjectId(userId) }).populate("office","name");   // ObjectId convierte el string a ObjetId de mongo

                if (!foundBookingsUser) res.status(404).json({ success: false, data: `The user ${userId} has no bookings` })

                res.status(200).json(
                    {
                        success: true,
                        data: foundBookingsUser,
                        message: `The user ${userId} does have bookings`,
                    })

            } catch (error) {
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `User not found`,
                    });
            }
            break;

        case "DELETE": // si no existe el booking responde con 409 y un mensaje, sino lo borra:        
            break;

        case "PUT": // busca el booking del bookingId que viene por params y lo edita:
            break;

        default:
            res.status(400).json({
                success: false,
                data: error,
                message: `Function not working`,
            });
            break;
    }
}




// .populate("office","name")