import axios from "axios";
//react
import { useForm } from "react-hook-form";
//Next.js
import Link from "next/link";

//styles
import {
  Flex,
  Input,
  Button,
  Avatar,
  Stack,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log("esta es la form data", formData);
    axios
      .post("/api/users", formData)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Avatar bg="teal.500" mb={10} />
      <Flex
        width="90vw"
        direction="column"
        alignItems="center"
        background="gray.100"
        p={2}
        rounded={6}
      >
        <Flex alignItems="center" justifyContent="center" mb={6}>
          <Link href="/users">
            <Button>Log in</Button>
          </Link>
          <span className="bold-underlined">Register</span>
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name}>
            <Stack spacing={3}>
              <Input
                type="text"
                placeholder="Name"
                variant="flushed"
                id="name"
                {...register("name")}
              />
              <Input
                type="text"
                placeholder="Last Name"
                variant="flushed"
                id="lastname"
                {...register("lastname")}
              />
              <Input
                type="text"
                placeholder="DNI"
                variant="flushed"
                id="dni"
                {...register("dni", {
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
              <Input
                type="text"
                placeholder="address"
                variant="flushed"
                name="address"
                {...register("address")}
              />
              <Input
                type="email"
                placeholder="E-mail"
                variant="flushed"
                id="email"
                {...register("email", {
                  required: "E-mail is required",
                })}
              />
              <Input
                type="password"
                placeholder="Password"
                variant="flushed"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 7,
                    message: "Minimum length is 7",
                  },
                })}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                variant="flushed"
                id="confirmpassword"
              />
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                margin={6}
              >
                Submit
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};

export default Register;
