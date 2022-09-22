import OperatorPanel from "../../src/components/Operator/OperatorPanel";
import Layout from "../../src/components/common/Layout/Layout";

import React from 'react'
import { getSession } from "next-auth/react";

export default function MyAppointments() {
  return (
    <Layout>
      <OperatorPanel />
    </Layout>
  )
}
// export async function getServerSideProps(context) {

//   // console.log("CONTEXT", context)

//   const session = await getSession({ req: context.req })

//   //console.log("SESSION", session)

//   if (session === null || session.user.role === "customer") {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props: { session }
//   }

// }