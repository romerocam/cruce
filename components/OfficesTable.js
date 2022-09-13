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
} from "@chakra-ui/react";

export default function OfficesTable(props) {
  return (
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
                    <ViewIcon /> <EditIcon />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
