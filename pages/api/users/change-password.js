/* ******************************
 *      RUTA:                   *
 *   api/users/change-password  *
 * ******************************/

import { getSession } from "next-auth/react";

import connectMongo from "../../../util/dbConnect";
import { hashPassword, verifyPassword } from "../../../util/auth"
import User from "../../../models/User";


export default async function handler(req, res) {
    const { method } = req;

    if (method !== 'POST') {
        return;
    }

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: 'Not Authenticated!' })
        return
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {

        const client = await connectMongo();

        const foundUser = await User.findOne({ email: userEmail })

        if (!foundUser) {

            res.status(404).json({ message: 'user not found!' });
            client.close();
            return;
        }

        const dbPassword = foundUser.password


        // verifyPassword(password, hashedPassword): 
        const passwordsAreEqual = await verifyPassword(oldPassword, dbPassword)

        if (!passwordsAreEqual) {

            // no pongo 401 porque esta logueado (esta autentificado pero no tiene los permisos porque puso mal el password):
            res.status(403).json({ message: 'invalid password' });
            client.close();
            return;
        }

        // hashPassword(password) :
        const newHashedPassword = await hashPassword(newPassword)

        // $set edita las propiedades que se especifiquen dentro (sino existe la crea)
        const result = await User.updateOne({ email: userEmail }, { $set: { password: newHashedPassword } })

        client.close();
        res.status(200).json({ message: 'password updated' });

    } catch (error) {
        console.log(error)
        res
            .status(400)
            .json({
                success: false,
                data: error,
                message: 'could not update password',
            });

    }
}