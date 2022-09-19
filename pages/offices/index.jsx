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

export async function getServerSideProps() {
  const offices = await getOffices();
  return {
    props: {
      offices: JSON.parse(JSON.stringify(offices)),
    },
  };
}
