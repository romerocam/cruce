import nodemailer from 'nodemailer';

import dayjs from "dayjs";


import localizedFormat from "dayjs/plugin/localizedFormat"
import { timeToTwelve } from "../util/times"

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    // secure: true,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    }
});

function sendEmail(message) {
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
    });

}

export async function bookingEmail(booking, user, office) {

    // con la libreria dayjs para usar el formato ingles de fecha con texto se debe usar el plugin localizedFormat:
    dayjs.extend(localizedFormat)

    const startAtTwelve = timeToTwelve(booking.startAt)

    console.log("12_HORAS", startAtTwelve)

    // Message object
    let message = {
        from: `no-reply - Cruce Bookings App <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: `Booking # ${booking.id} Confirmed!`,
        // icalEvent: {     // para enviar evento de calendario con el mail
        //     filename: 'booking.ics',
        //     method: 'request',
        //     content: booking
        // },
        text: `Thank you ${user.name}. Your booking is confirmed: Date: ${booking.date}, Time: ${booking.startAt},Office Address: ${office.address}, Phone Number: ${office.phone}`,
        html: `<p>Thank you ${user.name} ${user.lastname} (${user.email}), your booking # <strong>${booking.id}</strong> is now confirmed :D</p>
        <p>Please save this details for future reference:</p>
            <ul>
            <li>Date: <strong>${dayjs(booking.date).format("LL")} </strong></li>
            <li>Time: <strong>${startAtTwelve} </strong></li>
            <li>Office Address: ${office.address} </li>
            <li>Office Phone Number: ${office.phone}</li>
            </ul>
            <p> We hope you'll have a good time in office <strong>${office.name}</strong>.</p>`
    };
    sendEmail(message)
}

export async function bookingReminderEmail(booking, user, office) {

    // con la libreria dayjs para usar el formato ingles de fecha con texto se debe usar el plugin localizedFormat:
    dayjs.extend(localizedFormat)

    const startAtTwelve = timeToTwelve(booking.startAt)

    console.log("12_HORAS", startAtTwelve)

    // Message object
    let message = {
        from: `no-reply - Cruce Bookings App <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: `Reminder Tomorrow Booking # ${booking.id}`,
        // icalEvent: {     // para enviar evento de calendario con el mail
        //     filename: 'booking.ics',
        //     method: 'request',
        //     content: booking
        // },
        text: `Dear ${user.name} ${user.lastname} (${user.email}), this is a remainder for your booking you have in our ${office.name} Office for tomorrow: Date: ${booking.date}, Time: ${booking.startAt},Office Address: ${office.address}, Phone Number: ${office.phone}`,
        html: `<p>Hello ${user.name} ${user.lastname} (${user.email})!! This email is to remind you of tomorrow's booking <strong># ${booking.id}</strong>.</p>
        <p>The details of your appointment are:</p>
            <ul>
            <li>Date: <strong>${dayjs(booking.date).format("LL")} </strong></li>
            <li>Time: <strong>${startAtTwelve} </strong></li>
            <li>Office Address: ${office.address} </li>
            <li>Office Phone Number: ${office.phone}</li>
            </ul>
            <p> We hope you'll have a good time in office <strong>${office.name}</strong>.</p>`
    };
    sendEmail(message)
}

export async function changePasswordEmail(user) {

    // Message object
    let message = {
        from: `no-reply - Cruce Bookings App <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: `Password Changed!`,
        text: `Hello ${user.name} ${user.lastname} (${user.email}), your password has been changed. If it wasn't you please contact us as soon as possible`,
        html: `<p>Hello ${user.name} ${user.lastname} (${user.email}), your password has been changed.</p>
        <p>If it wasn't you, please contact us as soon as possible.</p>`
    };

    sendEmail(message)

}

export async function registerEmail(user) {

    // Message object
    let message = {
        from: `no-reply - Cruce Bookings App <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: `Registration Complete!`,
        text: `Welcome ${user.name} ${user.lastname} (${user.email})!!
        We are glad to have joined us and hope we can see you in one of our offices.
            Email: ${user.email}
            Name: ${user.name}
            Lastname: ${user.name}
            DNI: ${user.dni}
            Address: ${user.address}`,
        html: `<p>Welcome ${user.name} ${user.lastname} (${user.email})!!</p>
        <p>We are glad you have joined us and hope we can see you soon in one of our offices.</p>
        <p>These are your account details:</p>
        <ul>
            <li> Email: <strong>${user.email} </strong> </li>
            <li> Name: <strong>${user.name} </strong> </li>
            <li> Lastname: <strong>${user.lastname} </strong> </li>
            <li> DNI: <strong>${user.dni} </strong> </li>
            <li> Address: <strong>${user.address} </strong> </li>
        </ul>
        <br/>
        <p> <strong>Cruce Bookings App</strong> </p>`
    };
    sendEmail(message)
}

export async function canceledBookingEmail(booking, user, office) {

    // con la libreria dayjs para usar el formato ingles de fecha con texto se debe usar el plugin localizedFormat:
    dayjs.extend(localizedFormat)

    const startAtTwelve = timeToTwelve(booking.startAt)

    console.log("12_HORAS", startAtTwelve)

    // Message object
    let message = {
        from: `no-reply - Cruce Bookings App  <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: `Booking # ${booking.id} Canceled!`,
        // icalEvent: {     // para enviar evento de calendario con el mail
        //     filename: 'booking.ics',
        //     method: 'request',
        //     content: booking
        // },
        text: `${user.name}, your booking was canceled: Date: ${booking.date}, Time: ${booking.startAt}, Office Address: ${office.address}, Phone Number: ${office.phone}`,
        html: `<p> ${user.name} ${user.lastname} (${user.email}), your <strong>booking # ${booking.id}</strong> was canceled. </p>
        <p>Here are the details of the canceled appointment:</p>
            <ul>
            <li>Date: <strong>${dayjs(booking.date).format("LL")} </strong></li>
            <li>Time: <strong>${startAtTwelve} </strong></li>
            <li>Office Address: ${office.address} </li>
            <li>Office Phone Number: ${office.phone}</li>
            </ul>
            <p> We hope you schedule a new booking soon,</p>
            <p> <strong> ${office.name} Office.</strong></p>`
    };
    sendEmail(message)
}