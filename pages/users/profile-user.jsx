import { getSession } from "next-auth/react";
import ProfileUser from "../../src/components/ProfileUser/ProfileUser";
import Layout from "../../src/components/common/Layout/Layout";

export default function ProfileUserPage() {
  return (
    <Layout>
      <ProfileUser />
    </Layout>
  );
}

// Para proteger la ruta de profile-user desde el servidor:
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
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
