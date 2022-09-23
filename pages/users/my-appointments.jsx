import { getSession } from "next-auth/react";
import Appointments from "../../src/components/Appointments/Appointments";
import Layout from "../../src/components/common/Layout/Layout";

export default function MyAppointments() {
  return (
    <Layout>
      <Appointments />
    </Layout>
  );
}

// Para proteger la ruta de my-appointments desde el servidor:
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
