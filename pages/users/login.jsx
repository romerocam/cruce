import { Flex, Input, Button, Avatar, Stack, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn, useSession, getSession } from "next-auth/react";
//import { useSession } from 'next-auth/client'

import Layout from "../../src/components/common/Layout/Layout";

const UsersPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  //const session = await getSession({ req })

  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // console.log("SESSION", session);
  // console.log("LOADING", loading);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginResult = await signIn("credentials", {
      redirect: false, // para que no redirija a otra pagina cuando da error el login

      // le paso las credenciales al pedido (signIn)
      email: credentials.email,
      password: credentials.password,
    });

    console.log("LOGIN_RESULT", loginResult);

    // si login OK redirijo al perfil:
    if (loginResult.ok) {
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
          <Avatar bg={useColorModeValue("brand.700", "brand.600")} m={10} />
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
                    router.push("/users/forgot-password");
                  }}
                >
                  Forgot your password?
                </Button>
                <Button type="submit"
                  bg={useColorModeValue("brand.700", "brand.600")}
                  color={"white"}
                  _hover={{
                    bg: useColorModeValue("brand.600", "brand.700"),
                  }}>
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
