/* ***********************
 *          RUTA:        *
 *   api/bookings/:bookingId   *
 * ***********************/

import connectMongo from "../../../util/dbConnect";
import { ObjectId } from "mongodb";         // para convertir el bookingId que viene por params de string a ObjectId de Mongo
import Booking from "../../../models/Booking";

export default async function handler(req, res) {
    const { method } = req;
    const reqBody = req.body;
    const email = reqBody.email;

    /*
     * para obtener el bookingId que viene por params tiene q tener como ultima propiedad el
     * mismo nombre que esta entre [] en el nombre del archivo.
     */

    const bookingId = req.query.bookingId;

    await connectMongo();

    // HAY QUE HACER TODOS LOS METODOS (SON LOS DE [userId])

    switch (method) {
        case "GET": // busca el booking del bookingId pasado por params:
            try {
                const foundBooking = await Booking.findOne({ _id: bookingId });   // ObjectId convierte el string a ObjetId de mongo
                res.status(200).json(
                    {
                        success: true,
                        data: foundBooking,
                        message: `Booking N° ${foundBooking._id} found`,
                    })

            } catch (error) {
                res
                    .status(404)
                    .json({
                        success: false,
                        data: error,
                        message: `Booking not found`,
                    });
            }
            break;

        case "DELETE": // si no existe el usuario responde con 409 y un mensaje, sino lo borra:
            try {
                const existingUser = await User.findOne({ _id: ObjectId(userId) })
                if (!existingUser) {
                    res.status(409).json({ success: false, data: `User ${email} does not exist` })
                } else {
                    const deletedQuantity = await User.deleteOne({ _id: ObjectId(userId) })
                    console.log("DELETED QTY >>>>>", deletedQuantity)
                    res.status(200).json({
                        success: true,
                        data: {
                            // id: newUser._id,
                            email: email,
                        },
                        message: `User ${email} has been deleted`,
                    })
                }
            } catch (error) {
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `User has not been deleted`,
                    });
            }
            break;

        case "PUT": // busca el usuario del userId que viene por params y lo edita:
            try {

                /* 
                 * User.findOneAndUpdate(filter, updateInfo, option)
                 * option = { new: true } hace que retorne el documento actualizado, por defecto
                 * trae el anterio al update
                 */

                const updatedUser = await User.findOneAndUpdate(
                    { _id: ObjectId(userId) },
                    {
                        name: reqBody.name,
                        lastname: reqBody.lastname,
                        dni: reqBody.dni,
                        address: reqBody.address,
                        office: ObjectId(reqBody.office),
                        roles: reqBody.roles
                    },
                    { new: true })

                console.log("UPDATED USER >>>>>", updatedUser)

                // sino existe el user responde con 409 y un mensaje:
                if (!updatedUser) res.status(409).json({ success: false, data: `user ${email} does not exist` })

                res.status(200).json(
                    {
                        success: true,
                        data: {
                            name: updatedUser.name,
                            lastname: updatedUser.lastname,
                            dni: updatedUser.dni,
                            address: updatedUser.address
                        },
                        message: `User ${updatedUser.email} has been updated`,
                    })
            } catch (error) {
                console.log(error)
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `User has not been updated`,
                    });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}