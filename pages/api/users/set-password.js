/* ******************************
 *      RUTA:                   *
 *  /api/users/set-password     *
 * ******************************/

import { getSession } from "next-auth/react";

import connectMongo from "../../../util/dbConnect";
import { hashPassword, verifyPassword } from "../../../util/auth"
import User from "../../../models/User";
import { changePasswordEmail } from "../../../util/mailer";


export default async function handler(req, res) {
    const { method } = req;

    if (method !== 'POST') {
        return;
    }

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ title: 'Reset Password', message: 'Not Authenticated!' })
        return
    }

    const userEmail = session.user.email;
    // const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    console.log("BODY", req.body)

    try {

        const client = await connectMongo();

        const foundUser = await User.findOne({ email: userEmail }, 'name lastname email')

        if (!foundUser) {

            res.status(404).json({ title: 'Reset Password', message: 'user not found!' });
            return;
            // client.close();
        }

        // hashPassword(password) :
        const newHashedPassword = await hashPassword(newPassword)

        // $set edita las propiedades que se especifiquen dentro (sino existe la crea)
        const result = await User.updateOne({ email: userEmail }, { $set: { password: newHashedPassword } })
        console.log("FOUND_USER", foundUser)

        changePasswordEmail(foundUser)

        res.status(200).json({ title: 'Reset Password', message: 'password updated' });
        // client.close();

    } catch (error) {
        console.log(error)
        res
            .status(400)
            .json({
                success: false,
                data: error,
                title: 'Reset Password',
                message: 'could not update password',
            });

    }
}