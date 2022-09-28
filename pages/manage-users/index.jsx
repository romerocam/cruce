import ManageUsers from "../../src/components/Admin/ManageUsers";

import Layout from "../../src/components/common/Layout/Layout";

import { getSession } from "next-auth/react";

function ManageUsersPage() {


  return (
    <Layout>
      <ManageUsers />
    </Layout>
  );
}

export default ManageUsersPage;

// export async function getServerSideProps(context) {

//   // console.log("CONTEXT", context)

//   const session = await getSession({ req: context.req })

//   //console.log("SESSION", session)

//   if (session === null || session.user.role !== "admin") {
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
