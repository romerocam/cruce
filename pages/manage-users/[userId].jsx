import React, { useEffect, useState } from 'react'
import EditUser from '../../src/components/Admin/EditUser'
import axios from 'axios'
import Layout from '../../src/components/common/Layout/Layout'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'


const EditUserPage = () => {
  const router = useRouter()
  const {userId} =router.query

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

export async function getServerSideProps(context) {

  // console.log("CONTEXT", context)

  const session = await getSession({ req: context.req })

  //console.log("SESSION", session)

  if (session === null || session.user.role !== "admin") {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }

}

