/* ******************************
 *           RUTA:              *
 *  /api/users/change-password  *
 * ******************************/

import { getSession } from "next-auth/react";

import connectMongo from "../../../util/dbConnect";
import User from "../../../models/User";
import { hashPassword, verifyPassword } from "../../../util/auth"
import { changePasswordEmail } from "../../../util/mailer";


export default async function handler(req, res) {
    const { method } = req;

    if (method !== 'POST') {
        return;
    }

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ title: 'Change Password', message: 'Not Authenticated!' })
        return
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    console.log("BODY", req.body)

    try {

        const client = await connectMongo();

        const foundUser = await User.findOne({ email: userEmail }, 'name lastname email password')

        if (!foundUser) {

            res.status(404).json({ title: 'Change Password', message: 'user not found!' });
            return;
            // client.close();
        }

        const dbPassword = foundUser.password


        // verifyPassword(password, hashedPassword): 
        const passwordsAreEqual = await verifyPassword(oldPassword, dbPassword)

        if (!passwordsAreEqual) {

            // no pongo 401 porque esta logueado (esta autentificado pero no tiene los permisos porque puso mal el password):
            res.status(403).json({ title: 'Change Password', message: 'invalid password' });
            return;
            // client.close();
        }

        // hashPassword(password) :
        const newHashedPassword = await hashPassword(newPassword)

        // $set edita las propiedades que se especifiquen dentro (sino existe la crea)
        const result = await User.updateOne({ email: userEmail }, { $set: { password: newHashedPassword } })
        console.log("RESULT", result)

        changePasswordEmail(foundUser)

        res.status(200).json({ title: 'Change Password', message: 'password updated' });
        // client.close();

    } catch (error) {
        res
            .status(400)
            .json({
                success: false,
                data: error,
                title: 'Change Password',
                message: 'could not update password',
            });

    }
}