import ManageUsers from "../../src/components/Admin/ManageUsers";
//import {getAllUsers} from "../api/users/index"
// import axios from "axios";
import Layout from "../../src/components/common/Layout/Layout";
// import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

function ManageUsersPage() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/users")
  //     .then((response) => setUsers(response.data.data))
  //     .catch((error) => error.message);
  // }, []);

  return (
    <Layout>
      <ManageUsers /* users={users}  *//>
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
