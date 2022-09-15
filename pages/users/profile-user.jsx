import ProfileUser from "../../src/components/ProfileUser/ProfileUser";
import Layout from "../../src/components/common/Layout/Layout";
import { getSession } from "next-auth/react";

export default function ProfileUserPage({ session }) {
  console.log("SESSION", session)
  return (
    <Layout>
      <ProfileUser session={session} />
    </Layout>
  );
}


export async function getServerSideProps(context) {

  // console.log("CONTEXT", context)

  const session = await getSession({ req: context.req })

  //console.log("SESSION", session)

  if (!session) {
    return {
      redirect: {
        destination: '/users/login',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }

}
