import { useRef, useState } from "react";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const CancelAppointment = ({ booking, offices }) => {
  const router = useRouter();

  const  [isOpen, setIsOpen] = useState(false)
  const onClose = ()=> {setIsOpen(false)}
  const cancelRef = useRef()

  const cancelAppointment = (e) => {
    e.preventDefault();
    onClose()
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
        <Button variant="solid" colorScheme="red" onClick={()=>{setIsOpen(true)}}>
          Cancel Appointment
        </Button>

        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Cancel Appointment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Go Back
              </Button>
              <Button colorScheme='red' onClick={cancelAppointment} ml={3}>
                Cancel Appointment
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Stack>
    </Container>
  );
};

export default CancelAppointment;
