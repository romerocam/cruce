import BranchView from "../../src/components/Operator/BranchView";
import Layout from "../../src/components/common/Layout/Layout";
// import axios from "axios";

// import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

export default function OperatorBranchView() {
  // const [bookings, setBookings] = useState([]);
  // const [pagination, setPagination] = useState([]);
  // const [officeName, setOfficeName] = useState({});

  // const { data: session, status } = useSession();
  // const loading = status === "loading"; // ver de sacarlo si no usamos un mensaje de loading

  // console.log("SESSION", session)
  // console.log("STATUS", status)

  // const officeId = session && session.user.office;

  // useEffect(() => {
  //   axios
  //     .get(`/api/offices/${officeId}`)
  //     .then((office) => setOfficeName(office.data.data.name))
  //     .then(() => {
  //       axios
  //         .get(`http://localhost:3000/api/bookings/office/${officeId}/2`)
  //         .then((response) => {
  //           setBookings(response.data.data.bookings);
  //           setPagination(response.data.data.pagination)
  //         });
  //     });
  // }, []);

  // console.log("BOOKINGS-------------------->", bookings);
  // console.log("PAGINATION-------------------->", pagination);
  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  // console.log("OFFICE_NAME", officeName)

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
