import { getSession } from 'next-auth/react'
import React from 'react'
import Layout from '../../src/components/common/Layout/Layout'
import Register from '../../src/components/Register/Register'

const RegisterPage = () => {
  
  return (    
    <Layout>
        <Register />
    </Layout>
  )
}

export default RegisterPage

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/users/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
