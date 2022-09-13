import Link from "next/link";
import { Flex, Input, Button, Avatar, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UsersPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/auth/login", credentials);
    console.log("response", response);
    if (response.status === 200) {
      router.push("/dashboard");
    }
  };
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Avatar bg="teal.500" mb={10} />
      <Flex
        width="70vw"
        direction="column"
        alignItems="center"
        background="gray.100"
        p={2}
        rounded={6}
      >
        <Flex alignItems="center" justifyContent="center" mb={6}>
          <span className="bold-underlined" color="00A8E8">
            Log in
          </span>
          <Link href="/users/register">
            <Button>Register</Button>
          </Link>
        </Flex>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Input
              type="email"
              placeholder="E-mail"
              variant="flushed"
              name="email"
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Password"
              variant="flushed"
              name="password"
              onChange={handleChange}
            />
            <Link href="/users/forgotpassword">
              <span>Forgot your password?</span>
            </Link>
            <Button type="submit" colorScheme="teal" variant="solid">
              Log in
            </Button>
          </Stack>
        </form>
      </Flex>
    </Flex>
  );
};

export default UsersPage;
