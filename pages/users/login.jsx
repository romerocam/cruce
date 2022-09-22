import React from "react";
import { getSession } from "next-auth/react";

import Login from "../../src/components/Login/Login";


import Layout from "../../src/components/common/Layout/Layout";

const UsersPage = () => {
  return (
    <>
      <Layout>
        <Login />
      </Layout>
    </>
  );
};

export default UsersPage;


// Para proteger la ruta del perfil desde el servidor:
export async function getServerSideProps(context) {

  // console.log("CONTEXT", context)

  const session = await getSession({ req: context.req })

  //console.log("SESSION", session)

  if (session) {
    return {
      redirect: {
        destination: '/users/profile-user',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }

}
