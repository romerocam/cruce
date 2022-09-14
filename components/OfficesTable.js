import React from "react";
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
} from "@chakra-ui/react";

export default function OfficesTable(props) {
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Input
          placeholder="Search by name of the office"
          width="auto"
          marginTop="5px"
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
          <Table variant="striped" colorScheme="teal" size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Capacity</Th>
                <Th>Time Range</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.offices.map((office) => (
                <Tr key={office.name}>
                  <Td>{office.name}</Td>
                  <Td>{office.capacityPerSlot}</Td>
                  <Td>
                    {office.timeRange.from}-{office.timeRange.to}
                  </Td>
                  <Td>
                    <Box>
                      <button>
                        <ViewIcon />
                      </button>{" "}
                      <button>
                        <EditIcon />
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
