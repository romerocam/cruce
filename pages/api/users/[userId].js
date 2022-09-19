/* ***********************
 *          RUTA:        *
 *   api/users/:userId   *
 * ***********************/

/*
 * VER cual es la forma correcta para para una API REST:
 *
 * Hice los querys con tanto con info que llega por body (index.js)
 * como con info que llega por params (este archivo)
 */

import { getSession } from "next-auth/react";

import connectMongo from "../../../util/dbConnect";
import User from "../../../models/User";
import { ObjectId } from "mongodb";         // para convertir los ids que vienen en el pedido a ObjectId de Mongo

export default async function handler(req, res) {
    const { method } = req;
    const reqBody = req.body;
    const email = reqBody.email;

    /*
     * para obtener el userId que viene por params tiene q tener como ultima propiedad el
     * mismo nombre que esta entre [] en el nombre del archivo.
     */

    const userId = req.query.userId;

    // verifica que el usuario este logeado
    const session = await getSession({ req: req });
    if (!session) res.status(401).json({ message: 'Not Authenticated!' }); // return implicito


    await connectMongo();

    switch (method) {
        case "GET": // busca el usuario del userId pasado por params:
            try {
                const foundUser = await User.findOne({ _id: ObjectId(userId) }, 'name lastname dni address email roles office');    // ObjectId convierte el string a ObjetId de mongo
                res.status(200).json(
                    {
                        success: true,
                        data: foundUser,
                        message: `User ${foundUser.email} found`,
                    })

            } catch (error) {
                res
                    .status(404)
                    .json({
                        success: false,
                        data: error,
                        message: `User not found`,
                    });
            }
            break;

        case "DELETE": // si no existe el usuario responde con 409 y un mensaje, sino lo borra:
            try {
                const existingUser = await User.findOne({ _id: ObjectId(userId) })
                if (!existingUser) {
                    res.status(409).json({ success: false, data: `User ${email} does not exist` })
                } else {
                    const deletedQuantity = await User.deleteOne({ _id: ObjectId(userId) })
                    console.log("DELETED QTY >>>>>", deletedQuantity)
                    res.status(200).json({
                        success: true,
                        data: {
                            // id: newUser._id,
                            email: email,
                        },
                        message: `User ${email} has been deleted`,
                    })
                }
            } catch (error) {
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `User has not been deleted`,
                    });
            }
            break;

        case "PUT": // busca el usuario del userId que viene por params y lo edita:
            try {

                /* 
                 * User.findOneAndUpdate(filter, updateInfo, option)
                 * option = { new: true } hace que retorne el documento actualizado, por defecto
                 * trae el anterio al update
                 */

                const updatedUser = await User.findOneAndUpdate(
                    { _id: ObjectId(userId) },
                    {
                        name: reqBody.name,
                        lastname: reqBody.lastname,
                        dni: reqBody.dni,
                        address: reqBody.address,
                        // password: reqBody.password,             //  OJO: se guarda un password no hasheado!!
                        office: ObjectId(reqBody.office),
                        roles: reqBody.roles
                    },
                    { new: true })

                console.log("UPDATED USER >>>>>", updatedUser)

                // sino existe el user responde con 409 y un mensaje:
                if (!updatedUser) res.status(409).json({ success: false, data: `user ${email} does not exist` })

                res.status(200).json(
                    {
                        success: true,
                        data: {
                            name: updatedUser.name,
                            lastname: updatedUser.lastname,
                            dni: updatedUser.dni,
                            address: updatedUser.address
                        },
                        message: `User ${updatedUser.email} has been updated`,
                    })
            } catch (error) {
                console.log(error)
                res
                    .status(400)
                    .json({
                        success: false,
                        data: error,
                        message: `User has not been updated`,
                    });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}