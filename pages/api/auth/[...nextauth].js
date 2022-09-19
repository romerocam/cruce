import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
// import Providers from 'next-auth/providers';

import connectMongo from "../../../util/dbConnect";
import User from "../../../models/User";
import { verifyPassword } from '../../../util/auth';

/************************************************************************************************************************
 * NextAuth es una funcion que al ejecutarse retorna una handler function para
 * que podamos agarrar todos los request que llegan a /api/auth/
 * Recibe un objeto de configuracion donde se especifica la configuracion de la sesion, de los providers (proveedores
 * de servicio de login), etc, que a su vez llevan otro objeto de configuracion
 ************************************************************************************************************************/

export default NextAuth({

    /* 
     * aca se puede agregar info para setear un formulario propio de Next para el login (no lo usamos porque ya tenemos uno propio)
     * VER: https://next-auth.js.org/providers/credentials
     */

    // Para customizar la info que se le pasa al payload del JWT
    // Configuracion Callbacks: https://next-auth.js.org/configuration/callbacks
    // EJEMPLO DOCUMENTACION: (https://next-auth.js.org/tutorials/role-based-login-strategy)

    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },

        async session({ session, token, user }) {
            session.user.role = token.user.role; // Add role value to user object so it is passed along with session
            session.user.id = token.user.id; // Add id value to user object so it is passed along with session
            return session;
        }
    },

    session: { // es un objeto donde especificamos como la sesion del usuario autentificado sera administrada
        // jwt: true,       // next-auth v3
        strategy: "jwt"     // next-auth v4
    },
    providers: [
        CredentialsProvider({
            // como ya tenemos un formulario de autenticacion (no vamos a usar el que provee Next Auth)
            // no hace falta setear credenciales y pasamos directamente el metodo authorize:
            async authorize(credentials) {

                const client = await connectMongo();

                const foundUser = await User.findOne({ email: credentials.email })

                if (!foundUser) {
                    // hay que usar throw err para que authorize rechace la promesa y muestre un msg(por defecto redirije a otra pagina)
                    throw new Error('No user found!')
                }

                // comparamos el password ingresado en el form con el de la db:
                const isValid = await verifyPassword(credentials.password, foundUser.password);

                if (!isValid) {
                    // client.close();
                    throw new Error('Could not log you in!');
                }

                /* 
                 * Al retornar un objeto dentro de authorize le hacemos saber a Next Auth que la autorizacion
                 * tuvo exito. Este objeto va a ser codificado dentro del jwt. 
                 * Por ej, podemos incluir el email para identificar el usuario al que hace referencia el token.
                 * 
                 */

                // client.close();
                console.log(foundUser)

                /* 
                 * Por defecto deja usar las propiedades email y name, nosotros customizamos (en callbacks)
                 * para que agregue las propiedades role e id
                 */

                return { email: foundUser.email, role: foundUser.roles, name: foundUser.name, id: foundUser._id };
            }
        })
    ]
});