import nodemailer from 'nodemailer';

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
import { timeToTwelve } from "../util/times"

export async function bookingEmail(booking, user, office) {

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

    // con la libreria dayjs para usar el formato ingles de fecha con texto se debe usar el plugin localizedFormat:
    dayjs.extend(localizedFormat)

    const startAtTwelve = timeToTwelve(booking.startAt)

    console.log("12_HORAS", startAtTwelve)

    // Message object
    let message = {
        from: `no-reply - Confirmation Email <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: `Booking # ${booking.id} Confirmed!`,
        text: `Thank you ${user.name}. Your booking is confirmed: Date: ${booking.date}, Time: ${booking.startAt},Office Address: ${office.address}, Phone Number: ${office.phone}`,
        html: `<p>Thank you ${user.name} ${user.lastname} (${user.email}), your booking is now confirmed :D</p>
        <p>Please save this details for future reference:</p>
            <ul>
            <li>Date: <strong>${dayjs(booking.date).format("LL")} </strong></li>
            <li>Time: <strong>${startAtTwelve} </strong></li>
            <li>Office Address: ${office.address} </li>
            <li>Office Phone Number: ${office.phone}</li>
            </ul>
            <p> We hope you'll have a good time in office <strong>${office.name}</strong>.</p>`
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}


export async function changePasswordEmail(user) {

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

    // Message object
    let message = {
        from: `no-reply <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: `Booking # ${booking.id} Confirmed!`,
        text: `Thank you ${user.name}. Your booking is confirmed: Date: ${booking.date}, Time: ${booking.startAt},Office Address: ${office.address}, Phone Number: ${office.phone}`,
        html: `<p>Thank you ${user.name} ${user.lastname} (${user.email}), your booking is now confirmed :D</p>
    <p>Please save this details for future reference:</p>
        <ul>
        <li>Date: <strong>${dayjs(booking.date).format("LL")} </strong></li>
        <li>Time: <strong>${startAtTwelve} </strong></li>
        <li>Office Address: ${office.address} </li>
        <li>Office Phone Number: ${office.phone}</li>
        </ul>
        <p> We hope you'll have a good time in office <strong>${office.name}</strong>.</p>`
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

}