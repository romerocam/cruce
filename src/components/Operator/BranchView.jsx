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
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function BranchTable({}) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [officeName, setOfficeName] = useState({});
  const { data: session, status } = useSession();
  const officeId = session && session.user.office;
  const office = session && session.user.office;
  const role = session && session.user.role;
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/offices/${officeId}`)
      .then((office) => setOfficeName(office.data.data.name))
      .then(() => {
        axios
          .get(`http://localhost:3000/api/bookings/office/${officeId}/${page}`)
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
 
  const changeBookingStatus = (e,bookingId)=>{
    e.preventDefault()
    const attendance = e.target.value
    axios.put(`/api/bookings/${bookingId}`, {attendance})
    .then(response=>response.data)
    .catch(error=>console.log(error))
  }

  

  if (!bookings) {
    return <p>Loading...</p>;
  }

  return (
    <>
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
                          onChange={(e)=>changeBookingStatus(e,booking._id)}
                          >
                            <option>pending</option>
                            <option>present</option>
                            <option>absent</option>
                           
                          </Select>
                          {/* <Checkbox size="md" colorScheme="red" defaultChecked>
                            {booking.attendance}
                          </Checkbox>
                          <Checkbox size="md" colorScheme="green">
                            Cancelled
                          </Checkbox>
                          <Checkbox size="md" colorScheme="orange">
                            Attended
                          </Checkbox> */}
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
          {}
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
      </Container>
    </>
  );
}
