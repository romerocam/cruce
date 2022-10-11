import React, { useState } from "react";
import {
  Avatar,
  Box,
  Center,
  Stack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
  Container,
  useColorModeValue,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { signIn, useSession, getSession } from "next-auth/react";
import { HiMail, HiLockClosed } from "react-icons/hi";
//react
import { useForm } from "react-hook-form";

import ModalComponent from "../common/ModalComponent/ModalComponent";

const Login = () => {
  //States
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  //Constants
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorBg = useColorModeValue("brand.700", "brand.600");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (formData) => {
    const loginResult = await signIn("credentials", {
      redirect: false, // para que no redirija a otra pagina cuando da error el login

      // le paso las credenciales al pedido (signIn)
      email: formData.email,
      password: formData.password,
    });
    if (loginResult.ok) {
      console.log("------------------->>>", loginResult);
      router.push("/users/profile-user");
    } else {
        setTitle(loginResult.error.split("/")[0]);
        setMessage(loginResult.error.split("/")[1]);
        onOpen();      
    }
  };

  return (
    <>
    <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        props={{ title, message }}
      />
      <Container maxW={"7xl"} position={"relative"}>
        <Center py={6}>
          <Box
            maxW={"320px"}
            w={"full"}
            bg={"#FFFFFB"}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Avatar
              bg={colorBg}
              size={"xl"}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                isInvalid={errors.email || errors.password}
                textColor={"black"}
                marginY={"2vh"}
              >
                <InputGroup marginY={"1vh"}>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={HiMail} color={"gray.400"}></Icon>
                  </InputLeftElement>
                  <Input
                    variant="flushed"
                    focusBorderColor={colorBg}
                    placeholder="email address"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}
                    errorBorderColor="none"
                    id="email"
                    {...register("email", {
                      required: "E-mail is required",
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>

                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={HiLockClosed} color={"gray.400"}></Icon>
                  </InputLeftElement>
                  <Input
                    type="password"
                    variant="flushed"
                    focusBorderColor={colorBg}
                    placeholder="Password"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}
                    color={"black"}
                    errorBorderColor="none"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 7,
                        message: "Minimum length is 7",
                      },
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
                <Button
                  color="blue"
                  variant="link"
                  size="xs"
                  onClick={() => {
                    router.push("/users/forgot-password");
                  }}
                >
                  Forgot your password?
                </Button>

                <Stack pacing={6} direction={["column", "row"]} paddingTop={2}>
                  <Button
                    type="submit"
                    bg={colorBg}
                    color={"white"}
                    w="md"
                    _hover={{
                      bg: colorBg,
                    }}
                    disabled={!isValid}
                  >
                    Submit
                  </Button>
                </Stack>
              </FormControl>
            </form>
          </Box>
        </Center>
      </Container>
    </>
  );
};

export default Login;
