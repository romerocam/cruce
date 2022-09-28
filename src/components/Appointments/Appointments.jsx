import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Center,
  Icon,
  Button,
  Stack,
  Container,
} from "@chakra-ui/react";
import { HiArrowNarrowRight } from "react-icons/hi";

const Appointments = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const id = session?.user.id;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState([]);
  const [userBooking, setUserBooking] = useState([]);

  useEffect(() => {
    axios.get(`/api/bookings/user/${id}/${page}`).then((response) => {
      setUserBooking(response.data.data.foundBookingsUser);
      setPagination(response.data.data.pagination);
    });
  }, [page]);
  console.log("----pagination", pagination);
  console.log("----userBooking", userBooking);

  useEffect(() => {
    if (userBooking) {
      setPageCount(pagination.pageCount);
    }
  }, [userBooking]);
  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (parseInt(p) === pageCount) return parseInt(p);
      return parseInt(p) + 1;
    });
  }
  if (!userBooking) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Center py={6}>
        <Box
          flex={1}
          maxW={"96%"}
          w={"full"}
          bg={"#FFFFFB"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <TableContainer color={"black"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th style={{ borderBottomColor: "#E0E0E0", color: "black" }}>
                    Date
                  </Th>
                  <Th style={{ borderBottomColor: "#E0E0E0", color: "black" }}>
                    Time
                  </Th>
                  <Th style={{ borderBottomColor: "#E0E0E0", color: "black" }}>
                    Office
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {userBooking?.map((bookings) => {
                  return (
                    <Tr key={bookings._id}>
                      <Td style={{ borderBottomColor: "#E0E0E0" }}>
                        {dayjs(bookings.date).format("DD/MM/YYYY")}
                      </Td>
                      <Td style={{ borderBottomColor: "#E0E0E0" }}>
                        {bookings.startAt}
                      </Td>
                      <Td
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottomColor: "#E0E0E0",
                        }}
                      >
                        <span>{bookings.office.name}</span>
                        <Button
                          marginLeft={6}
                          bg="brand.700"
                          _dark={{ bg: "brand.600" }}
                          onClick={() => {
                            router.push(
                              `/users/my-appointments/${bookings._id}`
                            );
                          }}
                        >
                          <Icon as={HiArrowNarrowRight} color="white" />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
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
            Next ---
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
};

export default Appointments;
