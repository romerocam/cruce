import BranchView from "../../src/components/Operator/BranchView";
import Layout from "../../src/components/common/Layout/Layout";

import { getSession} from "next-auth/react";

export default function OperatorBranchView() {


  return (
    <Layout>
      <BranchView />
    </Layout>
  );
}

// Para proteger la ruta del perfil desde el servidor:
export async function getServerSideProps(context) {
  // console.log("CONTEXT", context)

  const session = await getSession({ req: context.req });

  //console.log("SESSION", session)

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
