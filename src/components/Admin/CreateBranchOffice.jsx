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
    formData.name = formData.name.replace(/\s+/g, " ");
    formData.address = formData.address.replace(/\s+/g, " ");
    axios
      .post("/api/offices", formData)
      .then((response) => {
        console.log(response);
      })
      .then((error) => console.log(error));
  };
  return (
    <Container maxW={"7xl"} position={"relative"}>
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
                textColor={"black"}
                marginY={"2vh"}
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
                    errorBorderColor="none"
                    id="name"
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^(?!\s*$)[-a-zA-Z,.'' ']{1,80}$/,
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
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={HiPhone} color={"gray.400"}></Icon>}
                  />
                  <Input
                    type={"number"}
                    variant="flushed"
                    focusBorderColor={useColorModeValue(
                      "brand.700",
                      "brand.600"
                    )}
                    placeholder="Phone Number"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}                    
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

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={HiClock} color={"gray.400"}></Icon>}
                  />

                  <Input
                  type={"time"}
                    variant="flushed"
                    focusBorderColor={useColorModeValue(
                      "brand.700",
                      "brand.600"
                    )}
                    placeholder="Opens At:"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}                    
                    errorBorderColor="none"
                    id="opensat"
                    {...register("timeRange.from", {
                      required: "Opening hour is required",                      
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.timeRangeFrom && errors.timeRangeFrom.message}
                </FormErrorMessage>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={HiClock} color={"gray.400"}></Icon>}
                  />

                  <Input
                  type={"time"}
                    variant="flushed"
                    focusBorderColor={useColorModeValue(
                      "brand.700",
                      "brand.600"
                    )}
                    placeholder="Closes At:"
                    _placeholder={{ color: "gray.500" }}
                    borderColor={"gray.200"}                  
                    errorBorderColor="none"
                    id="closesat"
                    name="closesat"
                    {...register("timeRange.to", {
                      required: "Opening hour is required",                     
                    })}
                  />
                </InputGroup>
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
                    errorBorderColor="none"
                    id="capacityPerSlot"
                    {...register("capacityPerSlot", {
                      required: "Max capacity is required",
                      validate: (value) =>
                        value > 0 || "Max capacity cannot be less than 1",
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
