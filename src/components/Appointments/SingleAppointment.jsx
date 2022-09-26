import { useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";
import {
  Box,
  Center,
  Stack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  Container,
  useColorModeValue,
  Select,
  FormErrorMessage,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const SingleAppointment = ({ booking, offices }) => {
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
    <div>
      <Container maxW={"7xl"} position={"relative"}>
        <Center py={6}>
          <Box
            maxW={"md"}
            w={"full"}
            bg={"#FFFFFB"}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >

            <Stack background="gray.100" margin="10px">
              <TableContainer mb="15px">
                <Table variant="striped" colorScheme="blue" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Appointment details:</Th>
                    </Tr>
                  </Thead>
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
              <Button
                 
                    variant="solid"
                    colorScheme="red"
                    onClick={cancelAppointment}
                  >
                    Cancel Appointment
                  </Button>
            </Stack>
            <Box mt="25px" >
                <p>Edit your appointment</p>
            </Box>

            <form>
              <FormControl>
                <Stack spacing={3}>
                  <Select
                    placeholder={booking.office.name}
                    defaultValue={booking.office}
                  >
                    {offices.map((office, i) => (
                      <option value={office._id} key={office._id}>
                        {office.name}
                      </option>
                    ))}
                  </Select>

                  <Select
                    placeholder={dayjs(booking.date).format("DD/MM/YYYY")}
                    defaultValue={dayjs(booking.date).format("DD/MM/YYYY")}
                  >
                    {/* {offices.map((office, i) => (
                      <option value={office._id} key={office._id}>
                        {office.name}
                      </option>
                    ))} */}
                  </Select>

                  <Select
                    placeholder={booking.startAt}
                    defaultValue={booking.startAt}
                  >
                    {/* {offices.map((office, i) => (
                      <option value={office._id} key={office._id}>
                        {office.name}
                      </option>
                    ))} */}
                  </Select>

                  {/* <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      //children={<Icon as={HiUser} color={"gray.400"}></Icon>}
                    />
                    <Input
                      variant="flushed"
                      defaultValue={dayjs(booking.date).format("DD/MM/YYYY")}
                      placeholder="Date"
                      _placeholder={{ color: "gray.500" }}
                      focusBorderColor={useColorModeValue(
                        "brand.700",
                        "brand.600"
                      )}
                      borderColor={"gray.200"}
                      errorBorderColor="none"
                    />
                  </InputGroup>
                  <FormErrorMessage></FormErrorMessage>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      //children={<Icon as={HiUser} color={"gray.400"}></Icon>}
                    />
                    <Input
                      variant="flushed"
                      defaultValue={booking.startAt}
                      placeholder="Time"
                      _placeholder={{ color: "gray.500" }}
                      focusBorderColor={useColorModeValue(
                        "brand.700",
                        "brand.600"
                      )}
                      borderColor={"gray.200"}
                      errorBorderColor="none"
                    />
                  </InputGroup>
                  <FormErrorMessage></FormErrorMessage> */}
                </Stack>
                <Stack spacing={6} direction={["column"]} paddingTop={5}>
                  <Button
                    type="submit"
                    bg={useColorModeValue("brand.700", "brand.600")}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: useColorModeValue("brand.600", "brand.700"),
                    }}
                  >
                    Save Changes
                  </Button>
                 
                </Stack>
              </FormControl>
            </form>
          </Box>
        </Center>
      </Container>
    </div>
  );
};

export default SingleAppointment;
