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
  Checkbox,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function BranchTable({ bookings, officeName, pagination }) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { data: session, status } = useSession();
  console.log("bookings--->", bookings);
  const office = session && session.user.office;
  const role = session && session.user.role;

  const router = useRouter();
  useEffect(() => {
    if (bookings) {
      setPageCount(pagination.pageCount);
      console.log("--pageCount", pageCount);
    }
  }, [bookings]);
  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
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
                          <Checkbox size="md" colorScheme="red" defaultChecked>
                            {booking.attendance}
                          </Checkbox>
                          <Checkbox size="md" colorScheme="green">
                            Cancelled
                          </Checkbox>
                          <Checkbox size="md" colorScheme="orange">
                            Attended
                          </Checkbox>
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
      <footer>
        Page: {page}
        <br />
        Page count: {pageCount}
        <br />
        <button disabled={page === 1} onClick={handlePrevious}>
          Previous
        </button>
        <br></br>
        <button disabled={page === pageCount} onClick={handleNext}>
          Next
        </button>
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
      </footer>
    </>
  );
}
