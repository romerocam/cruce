import React, { useEffect } from "react";
//react
import { useForm } from "react-hook-form";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
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
import { HiUser, HiMail } from "react-icons/hi";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import ModalComponent from "../common/ModalComponent/ModalComponent";

const ProfileUser = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading"; // ver de sacarlo si no usamos un mensaje de loading

  const { id, role } = session.user;

  const [profile, setProfile] = useState({});
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const colorBg = useColorModeValue("brand.700", "brand.600");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    axios.get(`/api/users/${id}`).then((profile) => {
      const { name, lastname, dni, email } = profile.data.data;
      setValue("name", name);
      setValue("lastname", lastname);
      setValue("dni", dni);
      setValue("email", email);
    });
  }, []);

  const onSubmit = (formData) => {
    formData.name = formData.name.replace(/\s+/g, " ");
    formData.lastname = formData.lastname.replace(/\s+/g, " ");
    axios
      .put(`/api/users/${id}`, formData)
      .then((response) => {
        setTitle(response.data.title);
        setMessage(response.data.message);
        onOpen();
        router.push("/users/profile-user");
        return response.data;
      })
      .catch((error) => console.log(error));
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
              size={"xl"}
              src={
                "data:image/png;base64,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"
              }
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"} color={"#000505"}>
              Profile
            </Heading>

            <Text fontSize={"sm"} fontFamily={"body"} color={"#000505"}>
              {`Role: ${role}`}
            </Text>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                <InputGroup marginY={"1vh"}>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={HiUser} color={"gray.400"}></Icon>
                  </InputLeftElement>
                  <Input
                    variant="flushed"
                    focusBorderColor={colorBg}
                    placeholder="name"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}
                    defaultValue={profile.name}
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

                <InputGroup marginY={"1vh"}>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={HiUser} color={"gray.400"}></Icon>
                  </InputLeftElement>
                  <Input
                    variant="flushed"
                    focusBorderColor={colorBg}
                    placeholder="lastname"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}
                    defaultValue={profile.lastname}
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

                <InputGroup marginY={"1vh"}>
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
                    defaultValue={profile.dni}
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
                    defaultValue={profile.email}
                    errorBorderColor="none"
                    id="email"
                    {...register("email", {
                      required: "E-mail is required",
                    })}
                    isDisabled={true}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
                <Stack spacing={6} direction={["column", "row"]} paddingTop={2}>
                  <Button
                    id="changePassword"
                    onClick={() => router.push("/users/change-password")}
                    // type="submit"
                    bg={colorBg}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: colorBg,
                    }}
                  >
                    Change Password
                  </Button>
                </Stack>
                <Stack spacing={6} direction={["column", "row"]} paddingTop={2}>
                  <Button
                    id="save"
                    type="submit"
                    bg={colorBg}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: colorBg,
                    }}
                  >
                    Save
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

export default ProfileUser;
