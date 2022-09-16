import React from "react";
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
                <Tr>
                  <Td>30/10/2022</Td>
                  <Td>10:15 am</Td>
                  <Td>
                    Sede Y{" "}
                    <Button
                      marginLeft={6}
                      bg={useColorModeValue("brand.700", "brand.600")}
                    >
                      <Icon
                        as={HiArrowNarrowRight}
                        color={useColorModeValue("white", "black")}
                      />
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>30/10/2022</Td>
                  <Td>10:15 am</Td>
                  <Td>
                    Sede Y{" "}
                    <Button
                      marginLeft={6}
                      bg={useColorModeValue("brand.700", "brand.600")}
                    >
                      <Icon
                        as={HiArrowNarrowRight}
                        color={useColorModeValue("white", "black")}
                      />
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>30/10/2022</Td>
                  <Td>10:15 am</Td>
                  <Td>
                    Sede Y{" "}
                    <Button
                      marginLeft={6}
                      bg={useColorModeValue("brand.700", "brand.600")}
                    >
                      <Icon
                        as={HiArrowNarrowRight}
                        color={useColorModeValue("white", "black")}
                      />
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>30/10/2022</Td>
                  <Td>10:15 am</Td>
                  <Td>
                    Sede Y{" "}
                    <Button
                      marginLeft={6}
                      bg={useColorModeValue("brand.700", "brand.600")}
                    >
                      <Icon
                        as={HiArrowNarrowRight}
                        color={useColorModeValue("white", "black")}
                      />
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>30/10/2022</Td>
                  <Td>10:15 am</Td>
                  <Td>
                    Sede Y{" "}
                    <Button
                      marginLeft={6}
                      bg={useColorModeValue("brand.700", "brand.600")}
                    >
                      <Icon
                        as={HiArrowNarrowRight}
                        color={useColorModeValue("white", "black")}
                      />
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </>
  );
};

export default Appointments;
