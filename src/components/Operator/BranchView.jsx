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
  Checkbox,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function BranchTable(props) {
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
        {`${office} ${role}`}
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
                <Th>Lastname</Th>
                <Th>Email</Th>
                <Th>Booking Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.users
                .filter((users) =>
                  users.email
                    .toLowerCase()
                    .includes(enteredSearchInput.toLowerCase())
                )
                .map((users) => (
                  <Tr key={users.name}>
                    <Td>{users.name}</Td>
                    <Td>{users.lastname}</Td>
                    <Td>{users.email}</Td>
                    <Td>
                      <Box>
                        <Stack spacing={[1, 5]} direction={["column", "row"]}>
                          <Checkbox size="md" colorScheme="red" defaultChecked>
                            Pending
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
