import ManageUsers from "../../src/components/Admin/ManageUsers";
//import {getAllUsers} from "../api/users/index"
import axios from "axios";
import Layout from "../../src/components/common/Layout/Layout"
import { useEffect, useState } from "react";



function ManageUsersPage() {

  const [users, setUsers] = useState([])

useEffect(() => {
  
  axios.get("http://localhost:3000/api/users").then(response=>setUsers(response.data.data)).catch(error=>error.message)
 
}, [])


  return (
  
    <Layout>

      <ManageUsers users={users} />
    </Layout>
 

  )
}

export default ManageUsersPage;

export async function getServerSideProps() {
  const users = await axios.get("http://localhost:3000/api/users").then(response=>response.data.data).catch(error=>error.message)
  console.log("users en axios", users)
  return {
    props: {
      usersList: users,
    },
  };
}
