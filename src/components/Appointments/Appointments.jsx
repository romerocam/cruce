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
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Center,
  Icon,
  Button,
  useColorModeValue,
  Flex,
  background,
} from "@chakra-ui/react";
import { HiArrowNarrowRight } from "react-icons/hi";

const Appointments = () => {
  const { data: session, status } = useSession();
  const id = session?.user.id;

  const [userBooking, setUserBooking] = useState({});

  useEffect(() => {
    axios.get(`/api/bookings/user/${id}`).then((bookings) => {
      setUserBooking(bookings);
    });
  }, []);

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
                    Time
                  </Th>
                  <Th style={{ borderBottomColor: "#E0E0E0", color: "black" }}>
                    Office
                  </Th>
                  <Th style={{ borderBottomColor: "#E0E0E0", color: "black" }}>
                    Date
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {userBooking?.data?.data.map((bookings) => {
                  return (
                    <Tr key={bookings._id}>
                      <Td style={{ borderBottomColor: "#E0E0E0" }}>
                        {dayjs(bookings.date).format("DD/MM/YYYY")}
                      </Td>
                      <Td style={{ borderBottomColor: "#E0E0E0" }}>
                        {dayjs(bookings.startAt).format("LT")}
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
                          //onClick={""}
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
    </>
  );
};

export default Appointments;
