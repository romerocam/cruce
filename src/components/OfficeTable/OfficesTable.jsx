import React, { useState } from "react";
import { useRouter } from "next/router";
import { ViewIcon } from "@chakra-ui/icons";
import { EditIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Input,
  Heading,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function OfficesTable(props) {
  const [enteredSearchInput, setEnteredSearchInput] = useState("");

  const colorBg = useColorModeValue("brand.700", "brand.600");

  const enteredSearchHandler = (event) => {
    setEnteredSearchInput(event.target.value);
  };

  const router = useRouter();

  return (
    <Box>
      <Heading as="h1" size="xl" display="flex" justifyContent="center" m="4">
        List of offices
      </Heading>
      <Box display="flex" justifyContent="center">
        <Input
          placeholder="Search by name of the office"
          width="auto"
          marginTop="5px"
          value={enteredSearchInput}
          onChange={enteredSearchHandler}
        />
      </Box>
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
                <Th>Name</Th>
                <Th>Capacity</Th>
                <Th>Time Range</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.offices
                .filter(
                  (office) =>
                    office.name
                      .toLowerCase()
                      .includes(enteredSearchInput.toLowerCase()) ||
                    office.capacityPerSlot
                      .toString()
                      .includes(enteredSearchInput.toLowerCase()) ||
                    office.timeRange.from
                      .toString()
                      .includes(enteredSearchInput.toLowerCase()) ||
                    office.timeRange.to
                      .toString()
                      .includes(enteredSearchInput.toLowerCase())
                )
                .map((office) => (
                  <Tr key={office.name}>
                    <Td>{office.name}</Td>
                    <Td>{office.capacityPerSlot}</Td>
                    <Td>
                      {office.timeRange.from}-{office.timeRange.to}
                    </Td>
                    <Td>
                      <Box>
                        <button
                          onClick={() =>
                            router.push(`/offices/view/${office._id}`)
                          }
                        >
                          <ViewIcon mr="2" w={4} h={4} color="Green" />
                        </button>
                        <button>
                          <EditIcon
                            onClick={() =>
                              router.push(`/offices/edit/${office._id}`)
                            }
                            ml="2"
                            w={4}
                            h={4}
                            color="darkOrange"
                          />
                        </button>
                      </Box>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Stack alignItems={"center"} paddingTop={5} paddingBottom={5}>
        <Button
          onClick={() => router.push("/users/adminpanel")}
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
    </Box>
  );
}
