/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
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
  Container,
  Center,
  Box,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";

import {
  HiMail,
  HiPhone,
  HiClock,
  HiUsers,
  HiHome,
} from "react-icons/hi";
import { useRouter } from "next/router";

import ModalComponent from "../common/ModalComponent/ModalComponent"

const EditBranchOffice = () => {

  const router = useRouter();

  const [office, setOffice] = useState({})
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { officeId, edit } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    axios.get(`/api/offices/${officeId}`)
      .then(response => {
        const { name, address, phone, capacityPerSlot } = response.data.data
        const { from, to } = response.data.data.timeRange

        setValue("name", name)
        setValue("address", address)
        setValue("phone", phone)
        setValue("capacityPerSlot", capacityPerSlot)
        setValue("opensat", from)
        setValue("closesat", to)
        setOffice(response.data.data)
      })
  }, [])


  const onSubmit = (formData) => {
    formData.name = formData.name.replace(/\s+/g, " ");
    formData.address = formData.address.replace(/\s+/g, " ");

    axios
      .put(`/api/offices/${office._id}`, formData)
      .then((response) => {
        setTitle(response.data.title);
        setMessage(response.data.message);
        onOpen();

      })
      .catch((error) => {
        setTitle(error.response.data.title);
        setMessage(error.response.data.message);
        onOpen();
      })
  };

  let status = false

  if (edit === "view") { status = true }

  if (!office.name) {
    return <p>"Loading..."</p>
  }

  return (<>
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      props={{ title, message }}
    />
    <Container maxW={"7xl"} position={"relative"}>
      <Box
        bg={useColorModeValue("brand.700", "brand.600")}
        mt="20px"
        fontSize="2em"
        textAlign="center"
        color="white"
        fontWeight="bold"
      >
        {edit.charAt(0).toUpperCase() + edit.slice(1)} Branch Office
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
          <Stack alignItems={"center"} spacing={3}>
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
                    disabled={status}
                    defaultValue={office.name}
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
                    disabled={status}
                    defaultValue={office.address}
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
                    disabled={status}
                    defaultValue={office.phone}
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
                    disabled={status}
                    defaultValue={office.timeRange.from}
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
                    disabled={status}
                    defaultValue={office.timeRange.to}
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
                    disabled={status}
                    defaultValue={office.capacityPerSlot}
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

                <Stack direction={"row"} alignItems={"center"} paddingTop={5}>
                  <Button
                    onClick={() => router.push('/offices')}
                    bg={useColorModeValue("brand.700", "brand.600")}
                    color={"white"}
                    w="md"
                    _hover={{
                      bg: useColorModeValue("brand.600", "brand.700"),
                    }}
                  >
                    Back
                  </Button>
                  {status === true ? <Button onClick={() => router.push(`/offices/edit/${office._id}`)} bg={useColorModeValue("brand.700", "brand.600")} color={"white"} w="md" _hover={{ bg: useColorModeValue("brand.600", "brand.700") }}>Edit</Button> : < Button type="submit" bg={useColorModeValue("brand.700", "brand.600")} color={"white"} w="md" _hover={{ bg: useColorModeValue("brand.600", "brand.700") }}
                  >
                    Submit
                  </Button>}
                </Stack>
              </FormControl>
            </form>
          </Stack>
        </Box>
      </Center>
    </Container >
  </>
  );
};

export default EditBranchOffice;
