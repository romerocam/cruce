//next.js
import { useRouter } from "next/router";
//components
import Navbar from "./components/Navbar";
//styles
import { Flex, Box, Button } from "@chakra-ui/react";

const HomePage = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="80"
        width="100"
        margin="20px"
        background="teal.400"
      >
        <Box color="white" fontSize="50px" fontWeight="bold">
          Appointment Booking
        </Box>
        <Box color="white" fontSize="30px" fontWeight="bold">
          Made Easy!!!
        </Box>
        <Button
          mt="80px"
          onClick={() => {
            router.push("/users/register");
          }}
        >
          Get Started
        </Button>
      </Flex>
    </>
  );

};

export default HomePage;
