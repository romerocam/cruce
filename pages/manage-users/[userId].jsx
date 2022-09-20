import React, { useEffect, useState } from 'react'
import EditUser from '../../src/components/Admin/EditUser'
import axios from 'axios'
import Layout from '../../src/components/common/Layout/Layout'
import { useRouter } from 'next/router'


const EditUserPage = () => {
  const router = useRouter()
  const {userId} =router.query

  console.log("userId", userId)
  const[user, setUser] = useState({})

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/users/${userId}`).then(response=>setUser(response.data.data))
  },[])



  return (
   <Layout>
     <EditUser user={user}/>
   </Layout>
   
  )
}

export default EditUserPage

// export async function getServerSideProps(context){
//   const user = await axios.get(`http://localhost:3000/api/users/${context.params.userId}`).then(response=>response.data.data)
//   console.log("axios user", user)
//   return{
//     props:{
//       userData: user
//     }
//   }
// }