import Layout from "../../src/components/common/Layout/Layout";
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
      router.push("/users/profile-user");
    }
  };

  return (
    <>
      <Layout>
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="flex-start"
          direction="column"
        >
          <Avatar bg="teal.500" m={10} />
          <Flex
            width="70vw"
            direction="column"
            alignItems="center"
            background="gray.100"
            p={2}
            rounded={6}
          >
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
                <Button
                  color="blue"
                  variant="link"
                  size="xs"
                  alignSelf="flex-end"
                  onClick={() => {
                    router.push("/users/forgotpassword");
                  }}
                >
                  Forgot your password?
                </Button>
                <Button type="submit" colorScheme="teal" variant="solid">
                  Log in
                </Button>
              </Stack>
            </form>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default UsersPage;
