/* eslint-disable react/no-children-prop */
import React from "react";
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
} from "@chakra-ui/react";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const router = useRouter();

  const onSubmit = (formData) => {
    console.log("esta es la form data", formData);
    axios
      .post("/api/users", formData)
      .then((response) => {
        router.push("/users");
        return response.data;
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Container maxW={"7xl"} zIndex={1} position={"relative"}>
        <Center py={6}>
          <Box
            maxW={"94%"}
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
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={HiUser} color={"gray.400"}></Icon>}
                    />
                    <Input
                      variant="flushed"
                      focusBorderColor={useColorModeValue(
                        "brand.700",
                        "brand.600"
                      )}
                      placeholder="Name"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      color={"black"}
                      errorBorderColor="none"
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={HiUser} color={"gray.400"}></Icon>}
                    />
                    <Input
                      variant="flushed"
                      focusBorderColor={useColorModeValue(
                        "brand.700",
                        "brand.600"
                      )}
                      placeholder="Last Name"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      color={"black"}
                      errorBorderColor="none"
                      id="lastname"
                      {...register("lastname", {
                        required: "Last Name is required",
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.lastname && errors.lastname.message}
                  </FormErrorMessage>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={HiUser} color={"gray.400"}></Icon>}
                    />
                    <Input
                      variant="flushed"
                      focusBorderColor={useColorModeValue(
                        "brand.700",
                        "brand.600"
                      )}
                      placeholder="DNI"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      color={"black"}
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
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={HiUser} color={"gray.400"}></Icon>}
                    />
                    <Input
                      variant="flushed"
                      focusBorderColor={useColorModeValue(
                        "brand.700",
                        "brand.600"
                      )}
                      placeholder="Address"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      color={"black"}
                      errorBorderColor="none"
                      id="address"
                      {...register("address", {
                        required: "Address is required",
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.address && errors.address.message}
                  </FormErrorMessage>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={HiMail} color={"gray.400"}></Icon>}
                    />
                    <Input
                      variant="flushed"
                      focusBorderColor={useColorModeValue(
                        "brand.700",
                        "brand.600"
                      )}
                      placeholder="E-mail"
                      _placeholder={{ color: "gray.500" }}
                      borderColor={"gray.200"}
                      color={"black"}
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
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={HiLockClosed} color={"gray.400"}></Icon>}
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
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={HiLockClosed} color={"gray.400"}></Icon>}
                    />
                    <Input
                      type="password"
                      variant="flushed"
                      focusBorderColor={useColorModeValue(
                        "brand.700",
                        "brand.600"
                      )}
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
            </Stack>
          </Box>
        </Center>
      </Container>
    </>
  );
};

export default Register;
