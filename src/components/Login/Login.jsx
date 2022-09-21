/* eslint-disable react/no-children-prop */
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
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { signIn, useSession, getSession } from "next-auth/react";
import { HiMail, HiLockClosed } from "react-icons/hi";
//react
import { useForm } from "react-hook-form";

const Login = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  //const session = await getSession({ req })

  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // console.log("SESSION", session);
  // console.log("LOADING", loading);

  const handleChange = (e) => {
    
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value)

    const loginResult = await signIn("credentials", {
      redirect: false, // para que no redirija a otra pagina cuando da error el login

      // le paso las credenciales al pedido (signIn)
      email: credentials.email,
      password: credentials.password,
    });

    console.log("LOGIN_RESULT", loginResult);

    // si login OK redirijo al perfil:
    if (loginResult.ok) {
      router.push("/users/profile-user");
    }
  };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: "onBlur" });

  return (
    <>
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
              bg={useColorModeValue("brand.700", "brand.600")}
              size={"xl"}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
            />
            <form onSubmit={handleSubmit}>
              <FormControl
                // isInvalid={errors.email || errors.password}
                textColor={"black"}
                marginY={"2vh"}
              >
                <InputGroup marginY={"1vh"}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={HiMail} color={"gray.400"}></Icon>}
                  />                          
                  <Input
                    variant="flushed"
                    onChange={handleChange}
                    focusBorderColor={useColorModeValue(
                      "brand.700",
                      "brand.600"
                    )}
                    placeholder="email address"
                    _placeholder={{ color: "gray.500" }}                    
                    borderColor={"gray.200"}
                    errorBorderColor="none"
                    id="email"
                    // {...register("email", {
                    //   required: "E-mail is required",
                    // })}
                  />
                </InputGroup>

                {/* <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage> */}

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon as={HiLockClosed} color={"gray.400"}></Icon>
                    }
                  />
                  <Input
                    type="password"
                    variant="flushed"
                    focusBorderColor={useColorModeValue(
                      "brand.700",
                      "brand.600"
                    )}
                    placeholder="Password"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}
                    color={"black"}
                    errorBorderColor="none"
                    onChange={handleChange}
                    id="password"
                    // {...register("password", {
                    //   required: "Password is required",
                    //   minLength: {
                    //     value: 7,
                    //     message: "Minimum length is 7",
                    //   },
                    // })}
                  />
                </InputGroup>

                {/* <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage> */}
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
                    bg={useColorModeValue("brand.700", "brand.600")}
                    color={"white"}
                    w="md"
                    _hover={{
                      bg: useColorModeValue("brand.600", "brand.700"),
                    }}
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
