import OfficesTable from "../../components/OfficesTable";
import { getOffices } from "../api/office";

function Offices(props) {
  return <OfficesTable offices={props.offices} />;
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
