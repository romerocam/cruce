import React, { useState } from "react";
import { useRouter } from "next/router";

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
  Checkbox,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function BranchTable({offices}) {
  const [enteredSearchInput, setEnteredSearchInput] = useState("");

  const enteredSearchHandler = (event) => {
    setEnteredSearchInput(event.target.value);
  };
  const { data: session, status } = useSession();

  const office = session && session.user.office;
  const role = session && session.user.role;

  const router = useRouter();

  return (
    <Box>
      <Heading as="h1" size="xl" display="flex" justifyContent="center" m="4">
        {`${office}`}
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
                <Th>Date</Th>
                <Th>Hour</Th>
                <Th>Booking Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {offices.map((office) => (
                  <Tr key={office._id}>
                    <Td>{office.user}</Td>
                    <Td>{office.date}</Td>
                    <Td>{office.startAt}</Td>
                    <Td>
                      <Box>
                        <Stack spacing={[1, 5]} direction={["column", "row"]}>
                          <Checkbox size="md" colorScheme="red" defaultChecked>
                            {office.attendance}
                          </Checkbox>
                          <Checkbox
                            size="md"
                            colorScheme="green"
                          >
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
  );
}
