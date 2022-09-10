import Link from "next/link";
import { Flex, Input, Button, Avatar , Stack,FormControl,
  FormErrorMessage,
  FormHelperText} from "@chakra-ui/react";


const Register = () => {
  const handleLogin = (e)=>{
    e.preventDefault()
    console.log("me estoy registrando!" )
  }
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Avatar bg="teal.500" mb={10} />
      <Flex
        width="90vw"
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

          <form onSubmit={handleLogin}>
            <Stack>
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
              <Button type='submit' colorScheme="teal" variant="solid">
                Submit
              </Button>
            </Stack>
          </form>

        {/* </FormControl> */}
      </Flex>
    </Flex>
  );
};

export default Register;
