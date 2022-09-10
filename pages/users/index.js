import Link from "next/link";
import { Flex, Input, Button, Avatar , Stack} from "@chakra-ui/react";


const UsersPage = () => {
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

        <form>
          <Stack> 
            <Input type="email" placeholder="E-mail" variant="flushed" mb={3} />
            <Input
              type="password"
              placeholder="Password"
              variant="flushed"
              mb={6}
            />
            <Button type='submit' colorScheme="teal" variant="solid">
              Log in
            </Button>
          </Stack>
        </form>
   
      </Flex>
    </Flex>
  );
};

export default UsersPage;
