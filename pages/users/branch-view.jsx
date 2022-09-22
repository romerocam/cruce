import BranchView from "../../src/components/Operator/BranchView";
import Layout from "../../src/components/common/Layout/Layout";
import { getAllUsers } from "../api/users";

import React from 'react'

export default function OperatorBranchView(props) {
  return (
    <Layout>
      <BranchView users={props.users}/>
    </Layout>
  )
}

export async function getServerSideProps() {
    const users = await getAllUsers();
    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
      },
    };
  }
