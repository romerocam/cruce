//react
import { useForm } from "react-hook-form";
//next.js
import { useRouter } from "next/router";
// next auth
import { getSession, signIn } from "next-auth/react";
//components
import Layout from "../../src/components/common/Layout/Layout";
//styles
import {
  Flex,
  Input,
  Button,
  Avatar,
  Stack,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";

import { HiMail } from "react-icons/hi";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const router = useRouter();

  const onSubmit = async (formData) => {
    // formData.preventDefault();

    const loginResult = await signIn("email", {
      redirect: false, // para que no redirija a otra pagina cuando da error el login

      // le paso las credenciales al pedido (signIn)
      email: formData.email,

    });


    router.push("/api/auth/verify-request?provider=email&type=email");
  };

  return (
    <>
      <Layout>
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="flex-start"
          direction="column"
        >
          <Avatar bg={useColorModeValue("brand.700", "brand.600")} m={10} />
          <Flex
            maxW={"94%"}
            w={"full"}
            direction="column"
            alignItems="center"
            background="#FFFFFB"
            boxShadow={"2xl"}
            p={6}
            rounded={"lg"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email} color={"black"}>
                <Stack spacing={3}>
                  <InputGroup marginY={"2vh"} size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={HiMail} color={"gray.400"}></Icon>}
                    />
                    <Input
                      type="email"
                      placeholder="Please enter your E-mail"
                      _placeholder={{ color: "gray.500" }}
                      id="email"
                      variant="flushed"
                      focusBorderColor={useColorModeValue(
                        "brand.700",
                        "brand.600"
                      )}
                      borderColor={"gray.200"}
                      errorBorderColor="none"
                      color={"black"}
                      {...register("email", {
                        required: "E-mail is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </InputGroup>
                  <Button
                  type="submit"
                  bg={useColorModeValue("brand.700", "brand.600")}
                  color={"white"}
                  w="md"
                  _hover={{
                    bg: useColorModeValue("brand.600", "brand.700"),
                  }}
                  >
                    Reset Password
                  </Button>
                </Stack>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default ForgotPassword;

// Para proteger la ruta del perfil desde el servidor:
export async function getServerSideProps(context) {

  // console.log("CONTEXT", context)

  const session = await getSession({ req: context.req })

  //console.log("SESSION", session)

  if (session) {
    return {
      redirect: {
        destination: '/users/set-password',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }

}