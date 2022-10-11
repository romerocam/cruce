/* ***********************
 *          RUTA:        *
 *   api/bookings/:bookingId   *
 * ***********************/

import { getSession } from "next-auth/react";

import connectMongo from "../../../util/dbConnect";
// import { ObjectId } from "mongodb";         // para convertir el bookingId que viene por params de string a ObjectId de Mongo
import Booking from "../../../models/Booking";
import Office from "../../../models/Office"
import "../../../models/User"
import { canceledBookingEmail } from "../../../util/mailer";

export default async function handler(req, res) {
    const { method } = req;
    const reqBody = req.body;

    /*
     * para obtener el bookingId que viene por params tiene q tener como ultima propiedad el
     * mismo nombre que esta entre [] en el nombre del archivo.
     */

    const bookingId = req.query.bookingId;

    // verifica que el usuario este logeado:
    const session = await getSession({ req: req });
    if (!session) res.status(401).json({ message: 'Not Authenticated!' }); // return implicito


    await connectMongo();

    switch (method) {
        case "GET": // busca el booking del bookingId pasado por params:
            try {
                const foundBooking = await Booking.findOne({ _id: bookingId }).populate("office", "name address phone");   // ObjectId convierte el string a ObjetId de mongo

                if (!foundBooking) res.status(404).json({ success: false, data: `Booking N° ${bookingId} does not exist` })

                res.status(200).json(
                    {
                        success: true,
                        data: foundBooking,
                        message: `Booking N° ${foundBooking._id} found`,
                    })

            } catch (error) {
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `Booking not found`,
                    });
            }
            break;

        case "DELETE": // si no existe el booking responde con 409 y un mensaje, sino lo borra:
            try {
                const existingBooking = await Booking.findOne({ _id: bookingId }).populate('office').populate('user', 'name lastname email dni')
                if (!existingBooking) {
                    res.status(409).json({ success: false, title: `Cancel Booking`, message: `Booking N° ${bookingId} does not exist` })
                } else {
                    const data = await Booking.deleteOne({ _id: bookingId })
                    console.log("DELETED DATA >>>>>", data)

                    console.log("EXISTING_BOOKING", existingBooking)
                    console.log("USER", existingBooking.user)
                    console.log("OFFICE", existingBooking.office)

                    canceledBookingEmail(existingBooking, existingBooking.user, existingBooking.office)

                    res.status(200).json({
                        success: true,
                        data,
                        title: `Cancel Booking`,
                        message: `Booking N° ${bookingId} has been deleted`,
                    })
                }
            } catch (error) {
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        title: `Cancel Booking`,
                        message: `Booking has not been deleted`,
                    });
            }
            break;

        case "PUT": // busca el booking del bookingId que viene por params y lo edita:
            try {

                /* 
                 * Booking.findOneAndUpdate(filter, updateInfo, option)
                 * option = { new: true } hace que retorne el documento actualizado, por defecto
                 * trae el anterio al update
                 */

                const data = await Booking.findOneAndUpdate(
                    { _id: bookingId },
                    {   // solo quiero editar attendance, ya que editar otra propiedad seria un turno nuevo:
                        attendance: reqBody.attendance,
                    },
                    { new: true })

                console.log("UPDATED BOOKING >>>>>", data)

                // sino existe el booking responde con 404 y un mensaje:
                if (!data) res.status(404).json({
                    success: false,
                    message: `Booking N° ${bookingId} does not exist`,
                    title: `Update Booking Status`,
                })

                res.status(200).json(
                    {
                        success: true,
                        data,
                        message: `Booking N° ${data._id} has been updated!`,
                        title: `Update Booking Status`,
                    })
            } catch (error) {
                console.log(error)
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `Booking has not been updated`,
                        title: "Update Booking Status"
                    });
            }
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