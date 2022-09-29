import React from 'react'
import Layout from '../../src/components/common/Layout/Layout'
import CreateBranchOffice from '../../src/components/Admin/CreateBranchOffice'
import { getSession } from 'next-auth/react'

const CreateBranchOfficePage = () => {
  return (
    <Layout>
      <CreateBranchOffice />
    </Layout>
  )
}

export default CreateBranchOfficePage

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