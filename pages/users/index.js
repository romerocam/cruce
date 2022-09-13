//next.js
import { useRouter } from "next/router";
//styles
import { Flex, Input, Button, Avatar, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const UsersPage = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
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
          <form>
            <Stack spacing={3}>
              <Input
                type="email"
                placeholder="E-mail"
                variant="flushed"
                focusBorderColor="teal.400"
                errorBorderColor="none"
              />
              <Input
                type="password"
                placeholder="Password"
                variant="flushed"
                focusBorderColor="teal.400"
                errorBorderColor="none"
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
    </>
  );
};

export default UsersPage;
