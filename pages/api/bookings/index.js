/* ***************
 *      RUTA:    *
 *   api/bookings/  *
 * ***************/

import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb"; // para convertir los ids que vienen en el pedido a ObjectId de Mongo
import Office from "../../../models/Office";
import { bookingEmail } from "../../../util/mailer";
import connectMongo from "../../../util/dbConnect";
import Booking from "../../../models/Booking";
import User from "../../../models/User";
var AsyncLock = require("async-lock");
var lock = new AsyncLock();

async function AddNewBooking(params, res) {
  try {
    const officeId = params.office;
    const dateId = new Date(params.date);
    const startAt = params.startAt;
    //const newId = await Booking.estimatedDocumentCount() + 1;
    //console.log("ID", newId)

    /*** Validation to ensure there are available slots before posting the booking ***/
    // 1st step: Get max capacity of the selected slot, per selected office, per selected date
    const officeData = await Office.findOne({ _id: officeId });
    const capacityPerSelection = officeData.capacityPerSlot;

    // 2nd step: Get already booked appointments on the selected slot
    const bookedSlots = await Booking.find({
      office: officeId,
      startAt: startAt,
      date: dateId,
    }).count();

    // 3rd step: Validate that the remainder is positive before posting the booking.
    //console.log("CapacityPerSelection", capacityPerSelection);
    //console.log("AlreadyBookedSlotsPerSelection", bookedSlots);

    const remainingAppointmentsPerSlot = capacityPerSelection - bookedSlots;

    if (remainingAppointmentsPerSlot) {
      const newBooking = await Booking.create({
        //_id: newId,
        date: params.date,
        startAt: params.startAt,
        office: ObjectId(params.office),
        user: ObjectId(params.user),
        attendance: params.attendance,
      });

      const populatedNewBooking = await Booking.find({ _id: newBooking._id })
        .populate("office")
        .populate("user", "name lastname email dni");

      bookingEmail(
        populatedNewBooking[0],
        populatedNewBooking[0].user,
        populatedNewBooking[0].office
      );

      res.status(201).json({
        success: true,
        data: newBooking,
        message: `Booking has been confirmed, check your email for details`, //${newBooking._id}
      });
    } else {
      res.status(409).json({
        success: false,
        message: `No remaining appointments`,
        title: `Create booking`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      data: error,
      message: `Could not create Booking`,
    });
  }
}

export default async function handler(req, res) {
  const { method } = req;
  const reqBody = req.body;

  // verifica que el usuario este logeado:
  const session = await getSession({ req: req });
  if (!session) res.status(401).json({ message: "Not Authenticated!" }); // return implicito

  await connectMongo();
  // console.log("BODY", reqBody);

  switch (method) {
    case "GET": // busca todos los bookings de la db:
      try {
        const bookings = await Booking.find({});

        if (!bookings)
          res.status(404).json({
            success: false,
            data: error,
            message: `There are no bookings on the Database yet!`,
          });

        res.status(200).json({ success: true, data: bookings });
      } catch (error) {
        res.status(400).json({
          success: false,
          data: error,
          message: `Bookings not found`,
        });
      }
      break;

    case "POST": // crear Booking:
      let key = `${req.body.office}_${req.body.date}_${req.body.startAt}`;
      db.Booking.getPlanCache().clear()
      lock.acquire(
        key,
        function () {
          AddNewBooking(req.body, res);
        },
        function (err, ret) {
          console.log("lock release");
        },
        {}
      );
      break;

    case "DELETE": // Borra Bookings masivamente:
      try {
        // solo los admin/operators pueden borrar turnos masivamente:
        if (session.user.role === "customer")
          res.status(403).json({ message: "Forbidden" }); // return implicito

        // para recibir un arreglo de ids: https://www.mongodb.com/docs/manual/reference/operator/query/in/

        const data = await Booking.deleteMany({
          _id: { $in: reqBody.idArray },
        });
        console.log("DELETED DATA >>>>>", data);
        res.status(200).json({
          success: true,
          data,
          message: `Deleted Bookings N° ${reqBody.idArray}!`,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          data: error,
          message: `Bookings not deleted`,
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
