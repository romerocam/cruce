import Layout from "../../src/components/common/Layout/Layout";
import Calendar from "../../src/components/Calendar/Calendar";
import Countdown from "react-countdown";
import { Box } from "@chakra-ui/react";

function refreshPage() {
  window.location.reload(false);
}


function NewBooking() {
  return (
    <Layout>
      <Box
        textAlign="center"
        backgroundColor="orange"
        width="100px"
        margin="auto"
        mt="5"
        color="white"
        fontWeight="700"
        borderRadius="10"

      >
        <Countdown
          date={Date.now() + 1000000}
          onComplete={() => {
            refreshPage();
          }}
        ></Countdown>
      </Box>
      <Calendar />
    </Layout>
  );
}

export default NewBooking;
