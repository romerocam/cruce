//react
import { useForm } from "react-hook-form";
//next.js
import { useRouter } from "next/router";
//components
import Layout from "../../src/components/common/Layout/Layout";
//styles
import {
  Flex,
  Input,
  Button,
  Avatar,
  Stack,
  FormControl,
  FormErrorMessage,
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
      <Layout>
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="flex-start"
          direction="column"
        >
          <Avatar bg="teal.500" m={10} />
          <Flex
            width="70vw"
            direction="column"
            alignItems="center"
            background="gray.100"
            p={2}
            rounded={6}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email}>
                <Stack spacing={3}>
                  <Input
                    type="email"
                    placeholder="E-mail"
                    id="email"
                    variant="flushed"
                    focusBorderColor="teal.400"
                    errorBorderColor="none"
                    {...register("email", {
                      required: "E-mail is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                  <Button type="submit" colorScheme="teal" variant="solid">
                    Send Reset Password Link
                  </Button>
                </Stack>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default ForgotPassword;
