import React from "react";
//react
import { useForm } from "react-hook-form";
//next.js
import { useRouter } from "next/router";
import { signIn, useSession, getSession } from "next-auth/react";
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
} from "@chakra-ui/react";

const ForgotPassword = () => {

  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const router = useRouter();

  session && router.push("/users/change-password");

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
                <Input
                  type="email"
                  placeholder="E-mail"
                  id="email"
                  variant="flushed"
                  focusBorderColor={useColorModeValue("brand.700", "brand.600")}
                  errorBorderColor="none"
                  {...register("email", {
                    required: "E-mail is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
                <Button
                  bg={useColorModeValue("brand.700", "brand.600")}
                  type="submit"
                  colorScheme="teal"
                  variant="solid"
                >
                  Send Reset Password Link
                </Button>
              </Stack>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default ForgotPassword;
