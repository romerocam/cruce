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
// getStaticPaths
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/users/');
  const data = await res.json();
  console.log('aca',data);
 // Getting the unique key of the user from the response
 // with the map method of JavaScript.
  // const paths= data.map((user) => {
  //   return {
  //     params:{id:user.id.toString()}
  //   }
  // })
  // return{
  //   paths,
  //   fallback: false
  // }

}
export async function getStaticProps(context) {
  // Obtain the user’s unique ID.
  const id = context.params.id

  // Append the ID as a parameter to the API endpoint.
  const res = await fetch(`http://localhost:3000/api/users/${userId}`)
  const data = await res.json()
  return {
    props: {
      user:data,
    },
  }
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