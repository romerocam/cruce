import React, { useState } from "react";
import axios from "axios";
//react
import { useForm } from "react-hook-form";
//Next.js
import { useRouter } from "next/router";
import {
  Flex,
  Input,
  Button,
  Avatar,
  Stack,
  FormErrorMessage,
  FormControl,
  Container,
  Center,
  Box,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";

import ModalComponent from "../common/ModalComponent/ModalComponent";

const Register = () => {
  //States
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  //Constants
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorBg = useColorModeValue("brand.700", "brand.600");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const router = useRouter();

  const onSubmit = (formData) => {
    formData.name = formData.name.replace(/\s+/g, " ");
    formData.lastname = formData.lastname.replace(/\s+/g, " ");
    formData.address = formData.address.replace(/\s+/g, " ");
    axios
      .post("/api/users", formData)
      .then((response) => {        
        router.push("/users/login");
        return response.data;
      })
      .catch((error) => {
        setTitle(error.response.data.title);
        setMessage(error.response.data.message);
        onOpen();
      });
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
            maxW={"60%"}
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
            <Stack spacing={3}>
              <form onSubmit={handleSubmit(onSubmit)} color={"#000505"}>
                <FormControl
                  isInvalid={
                    errors.name ||
                    errors.lastname ||
                    errors.dni ||
                    errors.address ||
                    errors.email ||
                    errors.password ||
                    errors.confirmpassword
                  }
                  textColor={"black"}
                  marginY={"2vh"}
                >
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={HiUser} color={"gray.400"}></Icon>
                    </InputLeftElement>
                    <Input
                      variant="flushed"
                      focusBorderColor={colorBg}
                      placeholder="name"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      errorBorderColor="none"
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        pattern: {
                          value: /^(?!\s*$)[-a-zA-Z,.'' ']{1,40}$/,
                          message:
                            "Exceeded character limit or special characters",
                        },
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>

                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={HiUser} color={"gray.400"}></Icon>
                    </InputLeftElement>
                    <Input
                      variant="flushed"
                      focusBorderColor={colorBg}
                      placeholder="lastname"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      errorBorderColor="none"
                      id="lastname"
                      {...register("lastname", {
                        required: "Last Name is required",
                        pattern: {
                          value: /^(?!\s*$)[-a-zA-Z,.'' ']{1,40}$/,
                          message:
                            "Exceeded character limit or special characters",
                        },
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.lastname && errors.lastname.message}
                  </FormErrorMessage>

                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={HiUser} color={"gray.400"}></Icon>
                    </InputLeftElement>
                    <Input
                      type="Number"
                      variant="flushed"
                      focusBorderColor={colorBg}
                      placeholder="DNI"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      errorBorderColor="none"
                      id="dni"
                      {...register("dni", {
                        required: "DNI is required",
                        minLength: {
                          value: 8,
                          message: "Please enter 8 digits",
                        },
                        maxLength: {
                          value: 8,
                          message: "Please enter 8 digits",
                        },
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.dni && errors.dni.message}
                  </FormErrorMessage>

                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={HiUser} color={"gray.400"}></Icon>
                    </InputLeftElement>
                    <Input
                      variant="flushed"
                      focusBorderColor={colorBg}
                      placeholder="Address"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      color={"black"}
                      errorBorderColor="none"
                      id="address"
                      {...register("address", {
                        required: "Address is required",
                        pattern: {
                          value: /^[a-zA-Z0-9\s,'#/-]*$/,
                          message:
                            "Exceeded character limit or special characters",
                        },
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.address && errors.address.message}
                  </FormErrorMessage>

                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={HiMail} color={"gray.400"}></Icon>
                    </InputLeftElement>
                    <Input
                      type="email"
                      variant="flushed"
                      focusBorderColor={colorBg}
                      placeholder="E-mail"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      color={"black"}
                      errorBorderColor="none"
                      id="email"
                      {...register("email", {
                        required: "E-mail is required",
                        pattern: {
                          value:
                            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                          message: "Enter a valid email",
                        },
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
                      // name="password"
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

                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={HiLockClosed} color={"gray.400"}></Icon>
                    </InputLeftElement>
                    <Input
                      type="password"
                      variant="flushed"
                      focusBorderColor={colorBg}
                      placeholder="Confirm Password"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      color={"black"}
                      errorBorderColor="none"
                      id="confirmpassword"
                      {...register("confirmpassword", {
                        validate: (value) =>
                          value === password.value ||
                          "The passwords do not match",
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.confirmpassword && errors.confirmpassword.message}
                  </FormErrorMessage>
                  <Stack alignItems={"center"} paddingTop={5}>
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
            </Stack>
          </Box>
        </Center>
      </Container>
    </>
  );
};

export default Register;
