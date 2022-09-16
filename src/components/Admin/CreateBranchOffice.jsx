/* eslint-disable react/no-children-prop */
import React from "react";
import axios from "axios";
//react
import { useForm } from "react-hook-form";
//style
import {
  Input,
  Button,
  Stack,
  FormErrorMessage,
  FormControl,
  FormHelperText,
  Container,
  Center,
  Box,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";

import {
  HiMail,
  HiPhone,
  HiClock,
  HiUsers,
  HiAtSymbol,
  HiHome,
} from "react-icons/hi";

const CreateBranchOffice = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (formData) => {
    console.log("el nuevo subsidiary es:", formData);
    axios
      .post("/api/offices", formData)
      .then((response) => {
        console.log(response);
      })
      .then((error) => console.log(error));
  };
  return (
    <Container maxW={"7xl"}  position={"relative"}>
      <Box
        bg={useColorModeValue("brand.700", "brand.600")}
        mt="20px"
        fontSize="2em"
        textAlign="center"
        color="white"
        fontWeight="bold"
      >
        Create New Branch Office
      </Box>
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
          <Stack spacing={3}>
            <form onSubmit={handleSubmit(onSubmit)} color={"#000505"}>
              <FormControl
                isInvalid={
                  errors.name ||
                  errors.address ||
                  errors.email ||
                  errors.phone ||
                  errors.timeRangeFrom ||
                  errors.timeRangeTo ||
                  errors.capacityPerSlot
                }
              >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={HiHome} color={"gray.400"}></Icon>}
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
                    children={<Icon as={HiMail} color={"gray.400"}></Icon>}
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
                    children={<Icon as={HiPhone} color={"gray.400"}></Icon>}
                  />
                  <Input
                    variant="flushed"
                    focusBorderColor={useColorModeValue(
                      "brand.700",
                      "brand.600"
                    )}
                    placeholder="Phone Number"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}
                    color={"black"}
                    errorBorderColor="none"
                    id="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.phone && errors.phone.message}
                </FormErrorMessage>

                {/* <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon as={HiAtSymbol} color={"gray.400"}></Icon>
                      }
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
                  </FormErrorMessage> */}

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={HiClock} color={"gray.400"}></Icon>}
                  />

                  <Input
                    variant="flushed"
                    focusBorderColor={useColorModeValue(
                      "brand.700",
                      "brand.600"
                    )}
                    placeholder="Opens At:"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}
                    color={"black"}
                    errorBorderColor="none"
                    id="opensat"
                    {...register("timeRange.from", {
                      required: "Opening hour is required",
                      validate: (value) =>
                        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ||
                        "Please enter the time with the following format: HH:MM",
                    })}
                  />
                </InputGroup>
                <FormHelperText textAlign="left" fontSize="12px">
                  Example: 07:30
                </FormHelperText>
                <FormErrorMessage>
                  {errors.timeRangeFrom && errors.timeRangeFrom.message}
                </FormErrorMessage>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={HiClock} color={"gray.400"}></Icon>}
                  />

                  <Input
                    variant="flushed"
                    focusBorderColor={useColorModeValue(
                      "brand.700",
                      "brand.600"
                    )}
                    placeholder="Closes At:"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}
                    color={"black"}
                    errorBorderColor="none"
                    id="closesat"
                    name="closesat"
                    {...register("timeRange.to", {
                      required: "Opening hour is required",
                      validate: (value) =>
                        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ||
                        "Please enter the time with the following format: HH:MM",
                    })}
                  />
                </InputGroup>
                <FormHelperText textAlign="left" fontSize="12px">
                  Example: 19:30
                </FormHelperText>
                <FormErrorMessage>
                  {errors.timeRangeTo && errors.timeRangeTo.message}
                </FormErrorMessage>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={HiUsers} color={"gray.400"}></Icon>}
                  />

                  <Input
                    type="number"
                    variant="flushed"
                    focusBorderColor={useColorModeValue(
                      "brand.700",
                      "brand.600"
                    )}
                    placeholder="Max capacity"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}
                    color={"black"}
                    errorBorderColor="none"
                    id="email"
                    {...register("capacityPerSlot", {
                      required: "Max capacity is required",
                      validate: (value) =>
                        value > 0 || "Max capacity cannot be less than 0",
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.capacityPerSlot && errors.capacityPerSlot.message}
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
  );
};

export default CreateBranchOffice;
