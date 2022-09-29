/* ***************
 *      RUTA:    *
 *   api/cron/   *
 * ***************/

import dayjs from "dayjs";
import Booking from "../../../models/Booking";
import "../../../models/Office";
import "../../../models/User";

import { bookingReminderEmail } from "../../../util/mailer";

// const SECRET = process.env.NEXTAUTH_SECRET

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // const { authorization } = req.headers;

            // if (authorization === `Bearer ${SECRET}`) {

            const today = new Date()
            // to return the date number(1-31) for the specified date
            console.log("today => ", today)
            let tomorrow = new Date()
            tomorrow.setDate(today.getDate() + 1)
            //returns the tomorrow date
            console.log("tomorrow => ", tomorrow)

            const tomorrowFormated = dayjs(tomorrow).format("YYYY/MM/DD")

            console.log("tomorrow formated => ", tomorrowFormated)

            const tomorrowBookings = await Booking.find({ date: tomorrowFormated }).populate('office').populate('user', 'name lastname email dni')

            console.log("TOMORROW_BOOKINGS", tomorrowBookings)

            tomorrowBookings.map(booking => bookingReminderEmail(booking, booking.user, booking.office))

            if (!tomorrowBookings)
                res.status(404).json({
                    success: false,
                    data: error,
                    title: `Cron Job Bookings`,
                    message: `There are no bookings for tomorrow!`,
                });

            res.status(200).json({ success: true, data: tomorrowBookings, title: `Cron Job Bookings`, message: `found tomorrow's bookings` });

            // } else {
            //     res.status(401).json({ success: false });
            // }
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
    }
}
