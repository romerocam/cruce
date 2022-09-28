import { getSession } from "next-auth/react";

import EditBranchOffice from "../../../src/components/Admin/EditBranchOffice";
import Layout from "../../../src/components/common/Layout/Layout";
import { getOffices } from "../../api/offices/index";

function Offices() {

  return (
    <Layout>
      <EditBranchOffice />
    </Layout>
  );
}

export default Offices;

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req })

  if (session === null || session.user.role !== "admin") {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const offices = await getOffices();
  return {
    props: {
      session,
      offices: JSON.parse(JSON.stringify(offices)),
    },
  };
}