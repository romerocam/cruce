// next auth
import { getSession } from "next-auth/react";
//components
import Layout from "../../src/components/common/Layout/Layout";
//styles

import ForgotPassword from "../../src/components/Forgotpassword/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <>
      <Layout>
        <ForgotPassword />
      </Layout>
    </>
  );
};

export default ForgotPasswordPage;

// Para proteger la ruta del perfil desde el servidor:
export async function getServerSideProps(context) {

  // console.log("CONTEXT", context)

  const session = await getSession({ req: context.req })

  //console.log("SESSION", session)

  if (session) {
    return {
      redirect: {
        destination: '/users/set-password',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }
}