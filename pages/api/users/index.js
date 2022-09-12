/* ***************
 *      RUTA:    *
 *   api/users/  *
 * ***************/

/*
 * VER cual es la forma correcta para para una API REST:
 *
 * Hice los querys con tanto con info que llega por body (este archivo)
 * como con info que llega por params (archivo [userId].js)
 */

import connectMongo from "../../../util/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;
    const reqBody = req.body;
    const email = reqBody.email;

    await connectMongo();

    switch (method) {
        case "GET": // busca todos los usuarios registrados:
            try {
                const users = await User.find({});
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `User has not been created`,
                    });
            }
            break;

        case "POST": // si ya existe el usuario responde con 409 y un mensaje, sino lo crea:
            try {
                const existingUser = await User.findOne({ email: email })
                if (existingUser) {
                    res.status(409).json({ success: false, data: `user already exist` })
                } else {

                    const newUser = await User.create(reqBody)
                    console.log("CREATED USER >>>>>", newUser)
                    res.status(201).json({
                        success: true,
                        data: {
                            id: newUser._id,
                            email: newUser.email,
                        },
                        message: `User ${newUser.email} has been created`,
                    })
                }
            } catch (error) {
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `User has not been created`,
                    });
            }
            break;

        // case "DELETE": // si no existe el usuario responde con 409 y un mensaje, sino lo borra:
        //     try {
        //         const existingUser = await User.findOne({ email: email })
        //         if (!existingUser) {
        //             res.status(409).json({ success: false, data: `user ${email} does not exist` })
        //         } else {
        //             const deletedQuantity = await User.deleteOne({ email: email })
        //             console.log("DELETED QTY >>>>>", deletedQuantity)
        //             res.status(200).json({
        //                 success: true,
        //                 data: {
        //                     // id: newUser._id,
        //                     email: email,
        //                 },
        //                 message: `User ${email} has been deleted`,
        //             })
        //         }
        //     } catch (error) {
        //         res
        //             .status(400)
        //             .json({
        //                 success: false,
        //                 data: error,
        //                 message: `User has not been deleted`,
        //             });
        //     }
        //     break;

        // case "PUT": // si no existe el usuario responde con 409 y un mensaje, sino lo edita:
        //     try {

        //         /* 
        //          * User.findOneAndUpdate(filter, updateInfo, option)
        //          * option = { new: true } hace que retorne el documento actualizado, por defecto
        //          * trae el anterio al update
        //          */

        //         const updatedUser = await User.findOneAndUpdate(
        //             { email: email },
        //             {
        //                 name: reqBody.name,
        //                 lastname: reqBody.lastname,
        //                 dni: reqBody.dni,
        //                 address: reqBody.address
        //             },
        //             { new: true })

        //         console.log("UPDATED USER >>>>>", updatedUser)
        //         if (!updatedUser) res.status(409).json({ success: false, data: `user ${email} does not exist` })

        //         res.status(200).json(
        //             {
        //                 success: true,
        //                 data: {
        //                     name: updatedUser.name,
        //                     lastname: updatedUser.lastname,
        //                     dni: updatedUser.dni,
        //                     address: updatedUser.address
        //                 },
        //                 message: `User ${updatedUser.email} has been updated`,
        //             })
        //     } catch (error) {
        //         res
        //             .status(400)
        //             .json({
        //                 success: false,
        //                 data: error,
        //                 message: `User has not been updated`,
        //             });
        //     }
        //     break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
