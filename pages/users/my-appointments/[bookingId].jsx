import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CancelAppointment from "../../../src/components/Appointments/CancelAppointment";
import Layout from "../../../src/components/common/Layout/Layout";
import EditAppointment from "../../../src/components/Appointments/EditAppointment";
import { Stack, Box, Container } from "@chakra-ui/react";
import { getSession } from "next-auth/react";

const SingleAppointmentPage = () => {
  const router = useRouter();
  const { bookingId } = router.query;

  const [booking, setBooking] = useState({});
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/bookings/${bookingId}`)
      .then((response) => {
        setBooking(response.data.data);
      })
      .catch((error) => error);

    axios.get("/api/offices").then((officesArray) => {
      setOffices(officesArray.data.data);
    });
  }, []);

  return (
    <Layout>
      <Container>
        <Box
          maxW={"xl"}
          w={"full"}
          bg={"#FFFFFB"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <Stack
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <CancelAppointment booking={booking} offices={offices} />
            <EditAppointment booking={booking} />
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
};

export default SingleAppointmentPage;

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