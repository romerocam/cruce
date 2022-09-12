import Link from "next/link";
import { Flex, Input, Button, Avatar , Stack} from "@chakra-ui/react";

const ForgotPassword = () => {
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

      <form>
        <Stack spacing={3}> 
          <Input type="email" placeholder="E-mail" variant="flushed"/>
          <Button type='submit' colorScheme="teal" variant="solid">
            Send Reset Password Link
          </Button>
        </Stack>
      </form>
 
    </Flex>
  </Flex>
  )
}

export default ForgotPassword