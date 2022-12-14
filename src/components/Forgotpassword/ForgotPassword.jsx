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
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";

import { HiMail } from "react-icons/hi";

const ForgotPassword = () => {
  const colorBg = useColorModeValue("brand.700", "brand.600");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const router = useRouter();

  const onSubmit = async (formData) => {   

    const loginResult = await signIn("email", {
      redirect: false, // para que no redirija a otra pagina cuando da error el login
      callbackUrl: "/users/set-password",
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
        <Avatar bg={colorBg} m={10} />
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
                  <InputLeftElement pointerEvents="none">
                    <Icon as={HiMail} color={"gray.400"}></Icon>
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Please enter your E-mail"
                    _placeholder={{ color: "gray.500" }}
                    id="email"
                    variant="flushed"
                    focusBorderColor={colorBg}
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
                  bg={colorBg}
                  color={"white"}
                  w="md"
                  _hover={{
                    bg: colorBg,
                  }}
                >
                  Reset Password
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
