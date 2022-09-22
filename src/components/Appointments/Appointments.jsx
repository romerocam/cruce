import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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
} from "@chakra-ui/react";
import { HiArrowNarrowRight } from "react-icons/hi";

const Appointments = () => {
  const { data: session, status } = useSession();
  const id = session?.user;

  console.log("user ------> ", id);

  const [userBooking, setUserBooking] = useState({});

  useEffect(() => {
    axios.get(`/api/bookings`, { data: { userId: id } }).then((bookings) => {
      setUserBooking(bookings);
    });
  }, []);

  console.log("Bookings --------->", userBooking);

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
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Office</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userBooking?.data?.data.map((bookings) => {
                  console.log(bookings.office);
                  return (
                    <Tr key={bookings._id}>
                      <Td>{bookings.date}</Td>
                      <Td>{bookings.startAt}</Td>
                      <Td>
                        {bookings.office ? bookings.office.name : "--"}                        
                        <Button
                          marginLeft={6}
                          //bg={useColorModeValue("brand.700", "brand.600")}
                        >
                          <Icon
                            as={HiArrowNarrowRight}
                            //color={useColorModeValue("white", "black")}
                          />
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
