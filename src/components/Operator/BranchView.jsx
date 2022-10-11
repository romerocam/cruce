import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayJs from "dayjs";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Stack,
  Select,
  Checkbox,
  Button,
  Container,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import axios from "axios";

import ModalComponent from "../common/ModalComponent/ModalComponent";

export default function BranchTable({}) {
  //States
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [officeName, setOfficeName] = useState({});
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  //Constants
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const officeId = session && session.user.office;
  const office = session && session.user.office;
  const role = session && session.user.role;
  const router = useRouter();
  const colorBg = useColorModeValue("brand.700", "brand.600");
  useEffect(() => {
    axios
      .get(`/api/offices/${officeId}`)
      .then((office) => setOfficeName(office.data.data.name))
      .then(() => {
        axios
          .get(`/api/bookings/office/${officeId}/${page}`)
          .then((response) => {
            setBookings(response.data.data.bookings);
            setPagination(response.data.data.pagination);
          });
      });
  }, [page]);

  useEffect(() => {
    if (bookings) {
      setPageCount(pagination.pageCount);
    }
  }, [bookings]);
  function handlePrevious() {
    setPage((p) => {
      if (parseInt(p) === 1) return parseInt(p);
      return parseInt(p) - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (parseInt(p) === pageCount) return parseInt(p);
      return parseInt(p) + 1;
    });
  }

  const changeBookingStatus = (e, bookingId) => {
    e.preventDefault();
    const attendance = e.target.value;
    axios
      .put(`/api/bookings/${bookingId}`, { attendance })
      .then((response) => {
        setTitle(response.data.title);
        setMessage(response.data.message);
        onOpen();
        response.data;
      })
      .catch((error) => {
        setTitle(error.response.data.title);
        setMessage(error.response.data.message);
        onOpen();
      });
  };

  if (!bookings) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        props={{ title, message }}
      />
      <Box>
        <Heading as="h1" size="xl" display="flex" justifyContent="center" m="4">
          {`${officeName}`}
        </Heading>

        <Box display="flex" justifyContent="center">
          <TableContainer
            w="60rem"
            border="1px"
            borderColor="gray.400"
            rounded="md"
            boxShadow="md"
            m={5}
          >
            <Table variant="striped" colorScheme="blue" size="sm">
              <Thead>
                <Tr>
                  <Th>Last Name</Th>
                  <Th>Date</Th>
                  <Th>Hour</Th>
                  <Th>Booking Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookings.map((booking) => (
                  <Tr key={booking._id}>
                    <Td>{booking.user?.lastname}</Td>
                    <Td>{dayJs(booking.date).format("DD/MM/YYYY")}</Td>
                    <Td>{booking.startAt}</Td>
                    <Td>
                      <Box>
                        <Stack spacing={[1, 5]} direction={["column", "row"]}>
                          <Select
                            defaultValue={booking.attendance}
                            onChange={(e) =>
                              changeBookingStatus(e, booking._id)
                            }
                          >
                            <option>pending</option>
                            <option>present</option>
                            <option>absent</option>
                          </Select>
                        </Stack>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Container maxW="2xl" centerContent>
        <Stack direction="row column" spacing={4} align="center">
          <Button
            colorScheme="teal"
            variant="solid"
            disabled={page === 1}
            onClick={handlePrevious}
          >
            Previous
          </Button>        
          <Button
            colorScheme="teal"
            variant="solid"
            disabled={page === pageCount}
            onClick={handleNext}
          >
            Next --
          </Button>
          <select
            value={page}
            onChange={(event) => {
              setPage(event.target.value);
            }}
          >
            {Array(pageCount)
              .fill(null)
              .map((_, index) => {
                return <option key={index}>{index + 1}</option>;
              })}
          </select>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} paddingTop={5}>
          <Button
            onClick={() => router.push("/users/operator-panel")}
            bg={colorBg}
            color={"white"}
            w="md"
            _hover={{
              bg: colorBg,
            }}
          >
            Back
          </Button>
        </Stack>
      </Container>
    </>
  );
}
