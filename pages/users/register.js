import { Flex, Input, Button, Avatar } from "@chakra-ui/react";
import Link from "next/link";

const Register = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" direction='column'>
       <Avatar bg='teal.500' mb={10} />
      <Flex
        width="70vw"
        direction="column"
        alignItems="center"
        background="gray.100"
        p={2}
        rounded={6}
      >
        <Flex alignItems="center" justifyContent="center" mb={6}>
          <Link href="/users">
            <Button>Log in</Button>
          </Link>
          <span className="bold-underlined">Register</span>
        </Flex>
        <Flex direction="column" justifyContent="center">
          <Input type="text" placeholder="Name" variant="flushed" mb={3} />
          <Input type="text" placeholder="Last Name" variant="flushed" mb={3} />
          <Input type="text" placeholder="DNI" variant="flushed" mb={3} />
          <Input type="email" placeholder="E-mail" variant="flushed" mb={3} />
          <Input
            type="password"
            placeholder="Password"
            variant="flushed"
            mb={3}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            variant="flushed"
            mb={6}
          />
        </Flex>
        <Button colorScheme="teal" variant="solid">
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default Register;
