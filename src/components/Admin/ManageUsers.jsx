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
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

export default function ManageUsers({users}) {

    console.log("los ususarios", users)
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Input
          placeholder="Search user by Name"
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
                <Th>Last Name</Th>
                <Th>DNI</Th>
                <Th>E-mail</Th>
                <Th>Role</Th>
                <Th>Assign Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.lastname}</Td>
                  <Td>{user.dni}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.roles}</Td>
                  <Td>
                    <Box>
                      <Checkbox mr="0.7em">Operator</Checkbox>
                      <Checkbox>Admin</Checkbox>
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
