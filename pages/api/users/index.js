/* ***************
 *      RUTA:    *
 *   api/users/  *
 * ***************/

import { getSession } from "next-auth/react";

import connectMongo from "../../../util/dbConnect";
import User from "../../../models/User";
import { registerEmail } from "../../../util/mailer";

export default async function handler(req, res) {
  const { method } = req;
  const reqBody = req.body;
  const email = reqBody.email;
  const pages = req.query.page || 1;
  console.log("pages--", pages);
  console.log("req query--", req.query);
  const usersPerPage = 10;

  await connectMongo();

  switch (method) {
    case "GET": // busca todos los usuarios registrados:
      try {
        // verifica que el usuario este logeado y que sea admin:
        const session = await getSession({ req: req });
        console.log("session:", session)
        if (!session) res.status(401).json({ title: `Get Users`, message: 'Not Authenticated!' }); // return implicito
        if (session.user.role === 'customer') res.status(403).json({ title: `Get Users`, message: 'Forbidden' }); // return implicito
        const skip = (pages - 1) * usersPerPage;
        const countPromise = User.estimatedDocumentCount(); 

        const usersPromise =  User.find(
          {},
          "name lastname dni address email role office"
        )
          .limit(usersPerPage)
          .skip(skip);
        const [count, users] = await Promise.all([countPromise, usersPromise]);
        console.log("--->count", count);
        console.log("----users", users.length);
        const pageCount = Math.ceil(count / usersPerPage);
        // console.log("USERS:", users)
        res.status(200).json({
          success: true,
          data: {
            users,
            pagination: {
              count,
              pageCount,
            },
          },
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          data: error,
          title: `Get Users`,
          message: `Could not find User.`,
        });
      }
      break;

    /*
     * Si ya existe el usuario responde con 409 y un mensaje, sino lo crea.
     * No protegemos esta ruta porque sino no se pueden registrar usuarios nuevos.
     */

    case "POST":
      try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
          res.status(409).json({
            success: false,
            title: `Sign Up`,
            message: `Email already in use.`,
          });
        } else {
          const newUser = await User.create(reqBody);
          console.log("CREATED USER >>>>>", newUser);

          registerEmail(newUser);

          res.status(201).json({
            success: true,
            data: {
              id: newUser._id,
              email: newUser.email,
            },
            title: `Sign Up`,
            message: `User ${newUser.email} registered`,
          });
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          data: error,
          title: `Sign Up`,
          message: `Could not register ${newUser.email}.`,
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
