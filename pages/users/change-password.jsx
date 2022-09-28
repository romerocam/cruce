
import React from 'react'

import { getSession } from 'next-auth/react';

import Layout from "../../src/components/common/Layout/Layout";
import ChangePassword from "../../src/components/Admin/ChangePassword";

export default function roleCreator() {
  return (
    <Layout>
      <ChangePassword />
    </Layout>
  )
}

// Para proteger la ruta del perfil desde el servidor:
export async function getServerSideProps(context) {

  // console.log("CONTEXT", context)

  const session = await getSession({ req: context.req })

  //console.log("SESSION", session)

  if (!session) {
    return {
      redirect: {
        destination: '/users/login',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }

}