import { useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";
import {
  Stack,
  Button,
  Container,
  Table,
  Box,
  Text,
  Divider,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const CancelAppointment = ({ booking, offices }) => {
  const router = useRouter();

  const cancelAppointment = (e) => {
    e.preventDefault();
    console.log("estoy cancelando");
    axios
      .delete(`/api/bookings/${booking._id}`)
      .then((response) => {
        alert("Your appointment has been cancelled successfully.");
        router.push("/users/my-appointments");
        return response.data.data;
      })
      .catch((error) => error);
  };

  console.log("booking:", booking);
  console.log(offices);

  if (!booking.office || !offices[0]) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Box>
        <Text fontSize="20px" as="b" color="">
          Appointment Details
        </Text>
      </Box>
      <Divider mb="20px" />
      <Stack background="gray.100" margin="10px">
        <TableContainer mb="15px">
          <Table variant="striped" colorScheme="blue" size="sm">
            <Tbody>
              <Tr>
                <Td>Office:</Td>
                <Td>{booking.office.name}</Td>
              </Tr>
              <Tr>
                <Td>Address:</Td>
                <Td>{booking.office.address}</Td>
              </Tr>
              <Tr>
                <Td>Phone:</Td>
                <Td>{booking.office.phone}</Td>
              </Tr>
              <Tr>
                <Td>Date:</Td>
                <Td>{dayjs(booking.date).format("DD/MM/YYYY")}</Td>
              </Tr>
              <Tr>
                <Td>Time:</Td>
                <Td>{booking.startAt}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Button variant="solid" colorScheme="red" onClick={cancelAppointment}>
          Cancel Appointment
        </Button>
      </Stack>
    </Container>
  );
};

export default CancelAppointment;
