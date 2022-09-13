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

    switch (method) {
        case "GET": // busca el booking del bookingId pasado por params:
            try {
                const foundBooking = await Booking.findOne({ _id: bookingId });   // ObjectId convierte el string a ObjetId de mongo

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
                const existingBooking = await Booking.findOne({ _id: bookingId })
                if (!existingBooking) {
                    res.status(409).json({ success: false, data: `Booking N° ${bookingId} does not exist` })
                } else {
                    const data = await Booking.deleteOne({ _id: bookingId })
                    console.log("DELETED DATA >>>>>", data)
                    res.status(200).json({
                        success: true,
                        data,
                        message: `Booking N° ${bookingId} has been deleted`,
                    })
                }
            } catch (error) {
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
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
                    {
                        date: reqBody.date,
                        startAt: reqBody.startAt,
                        attendance: reqBody.attendance,
                    },
                    { new: true })

                console.log("UPDATED BOOKING >>>>>", data)

                // sino existe el booking responde con 404 y un mensaje:
                if (!data) res.status(404).json({
                    success: false,
                    message: `Booking N° ${bookingId} does not exist`
                })

                res.status(200).json(
                    {
                        success: true,
                        data,
                        message: `Booking N° ${data._id} has been updated!`,
                    })
            } catch (error) {
                console.log(error)
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `Booking has not been updated`,
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