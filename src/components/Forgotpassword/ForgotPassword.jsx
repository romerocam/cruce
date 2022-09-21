import React from "react";
//react
import { useForm } from "react-hook-form";
//next.js
import { useRouter } from "next/router";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const router = useRouter();

  const onSubmit = (formData) => {
    console.log("el e-mail is:", formData);
    router.push("/users");
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
