import Layout from "../../src/components/common/Layout/Layout";
import Calendar from "../../src/components/Calendar/Calendar";
import Countdown from "react-countdown";
import { Box } from "@chakra-ui/react";
import { getSession } from "next-auth/react";

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    window.location.reload(false);
  } else {
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  }
};

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
          date={Date.now() + 60000}
          renderer={renderer}
        ></Countdown>
      </Box>
      <Calendar />
    </Layout>
  );
}

export default NewBooking;

export async function getServerSideProps(context) {

  // console.log("CONTEXT", context)

  const session = await getSession({ req: context.req })

  //console.log("SESSION", session)

  if (!session) {
    return {
      redirect: {
        destination: '/users/profile-user',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }

}
