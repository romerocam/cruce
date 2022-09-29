import { getSession } from "next-auth/react";
import Layout from "../../src/components/common/Layout/Layout";
import OfficesTable from "../../src/components/OfficeTable/OfficesTable";
import { getOffices } from "../api/offices/index";

function Offices(props) {
  return (
    <Layout>
      <OfficesTable offices={props.offices} />
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


