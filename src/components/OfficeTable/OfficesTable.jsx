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
} from "@chakra-ui/react";

export default function OfficesTable(props) {
  const [enteredSearchInput, setEnteredSearchInput] = useState("");

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
                .filter((office) =>
                  office.name
                    .toLowerCase()
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
                        <button onClick={() => router.push(`/offices/${office._id}-view`)}>
                          <ViewIcon mr="2" w={4} h={4} color="Green" />
                        </button>
                        <button>
                          <EditIcon onClick={() => router.push(`/offices/${office._id}-edit`)} ml="2" w={4} h={4} color="darkOrange" />
                        </button>
                      </Box>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
