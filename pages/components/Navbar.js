//next.js
import { useRouter } from "next/router";
//styles
import { Flex, Button } from "@chakra-ui/react";

const Navbar = () => {
  const router = useRouter();
  return (
    <div>
      <Flex
        justify="space-between"
        alignItems="center"
        background="teal.400"
        height="60px"
        width="100vw"
      >
        <Button
          margin="5px"
          onClick={() => {
            router.push("/");
          }}
        >
          Logo
        </Button>
        <Flex justify="space-between">
          <Button
            margin="5px"
            variant="outline"
            color="white"
            onClick={() => {
              router.push("/users");
            }}
          >
            Log In
          </Button>
          <Button
            margin="5px"
            onClick={() => {
              router.push("/users/register");
            }}
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Navbar;
