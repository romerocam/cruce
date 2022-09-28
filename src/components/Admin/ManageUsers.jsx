import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  Button,
  Container,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

export default function ManageUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users?page=${page}`)
      .then((response) => {
        setUsers(response.data.data.users)
        setPagination(response.data.data.pagination);
      })
      .catch((error) => error.message);
  }, [page]);

  const [enteredSearchInput, setEnteredSearchInput] = useState("");
  const enteredSearchHandler = (event) => {
    setEnteredSearchInput(event.target.value);
  };

  console.log("----pagination", pagination);
  console.log("----users", users);

  useEffect(() => {
    if (users) {
      setPageCount(pagination.pageCount);
    }
  }, [users]);
  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (parseInt(p) === pageCount) return parseInt(p);
      return parseInt(p) + 1;
    });
  }
  if (!users) {
    return <p>Loading...</p>;
  }
  return (
    <>
    <Box>
      <Box display="flex" justifyContent="center">
        <Input
          placeholder="Search User "
          width="auto"
          marginTop="5px"
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
                <Th>Last Name</Th>
                <Th>DNI</Th>
                <Th>E-mail</Th>
                <Th>Role</Th>
                <Th>Edit User</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users
                .filter((user) =>
                user.name.toLowerCase().includes(enteredSearchInput.toLowerCase()) || user.lastname.toLowerCase().includes(enteredSearchInput.toLowerCase()) || user.dni.toString().toLowerCase().includes(enteredSearchInput.toLowerCase()) || user.email.toLowerCase().includes(enteredSearchInput.toLowerCase()) || user.role.toLowerCase().includes(enteredSearchInput.toLowerCase()))
                .map((user) => (
                  <Tr key={user._id}>
                    <Td>{user.name}</Td>
                    <Td>{user.lastname}</Td>
                    <Td>{user.dni}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      <Box>
                        <Button
                          leftIcon={<EditIcon />}
                          size="xs"
                          onClick={() => {
                            router.push(`/manage-users/${user._id}`);
                          }}
                        ></Button>
                      </Box>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    <Container maxW="2xl" centerContent>
        <Stack direction="row column" spacing={4} align="center">
          <Button
            colorScheme="teal"
            variant="solid"
            disabled={page === 1}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          {}
          <Button
            colorScheme="teal"
            variant="solid"
            disabled={page === pageCount}
            onClick={handleNext}
          >
            Next ---
          </Button>
          <select
            value={page}
            onChange={(event) => {
              setPage(event.target.value);
            }}
          >
            {Array(pageCount)
              .fill(null)
              .map((_, index) => {
                return <option key={index}>{index + 1}</option>;
              })}
          </select>
        </Stack>
      </Container>
    </>
  );
}
