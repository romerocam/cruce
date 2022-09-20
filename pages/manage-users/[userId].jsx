import React from 'react'
import EditUser from '../../src/components/Admin/EditUser'

const EditUserPage = (props) => {
  return (
    <div>
        <EditUser user ={user} />
    </div>
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