import ManageUsers from "../../src/components/Admin/ManageUsers";
import {getAllUsers} from "../api/users/index"


function ManageUsersPage(props) {
  return <ManageUsers users={props.usersList} />;
}

export default ManageUsersPage;

export async function getServerSideProps() {
  const users = await getAllUsers();
  return {
    props: {
      usersList: JSON.parse(JSON.stringify(users)),
    },
  };
}
