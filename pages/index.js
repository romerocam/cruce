//next.js
import { useRouter } from "next/router";
//components
import Layout from "../src/components/common/Layout/Layout";
//styles
import { Grid, GridItem, Text, Flex, Box, Button } from "@chakra-ui/react";

const HomePage = () => {
  const router = useRouter();
  return (
    <>
      <Layout>
        <Grid
          templateColumns="repeat(4, 1fr)"
          templateRows="repeat(1, 1fr)"
          width="100"
          margin="20px"
          background="teal.400"
          rounded="lg"
        >
          <GridItem
            colSpan={{ base: "2", md: "1", lg: "1" }}
            rowSpan={1}
            alignSelf="center"
          >
            <img src="/calendar.png" alt="image" />
          </GridItem>
          <GridItem
            colSpan={{ base: "2", md: "3", lg: "3" }}
            rowSpan={1}
            alignSelf="center"
          >
            <Flex direction="column" align="center" justify="center" gap={10}>
              <Text
                textAlign="-webkit-center"
                color="white"
                fontWeight="bold"
                fontSize={{ base: "24px", md: "40px", lg: "56px" }}
              >
                e-Cruce Bookings
              </Text>
              <Text
                color="white"
                fontWeight="bold"
                fontSize={{ base: "18px", md: "34px", lg: "50px" }}
              >
                Made Easy!!!
              </Text>
              <Button
                m={5}
                backgroundColor="yellow.400"
                onClick={() => {
                  router.push("/users/register");
                }}
              >
                Get Started
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default HomePage;
