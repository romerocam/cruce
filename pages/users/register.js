import axios from "axios";
//react
import { useForm } from "react-hook-form";
//Next.js
import Link from "next/link";
import { useRouter } from "next/router";

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
  } = useForm({mode: "onBlur"});

  const router = useRouter()

  const onSubmit = (formData) => {
    console.log("esta es la form data", formData);
    // axios
    //   .post("/api/users", formData)
    //   .then((response) => {
    //   router.push("/users")
    //   return response.data
    //   })
    //   .catch((error) => console.log(error));
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
          <FormControl isInvalid={errors.name||errors.lastname||errors.dni||errors.address||errors.email||errors.password||errors.confirmpassword}>
            <Stack spacing={3}>
              <Input
                type="text"
                placeholder="Name"
                variant="flushed"
                focusBorderColor="teal.400"
                errorBorderColor="none"
                id="name"
                {...register("name", {
                  required: "Name is required"
                })}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              <Input
                type="text"
                placeholder="Last Name"
                variant="flushed"
                focusBorderColor="teal.400"
                errorBorderColor="none"
                id="lastname"
                {...register("lastname", {
                  required: "Last Name is required"
                })}
              />
              <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
              <Input
                type="text"
                placeholder="DNI"
                variant="flushed"
                focusBorderColor="teal.400"
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
              <FormErrorMessage>{errors.dni && errors.dni.message}</FormErrorMessage>
              <Input
                type="text"
                placeholder="address"
                variant="flushed"
                focusBorderColor="teal.400"
                errorBorderColor="none"
                id="address"
                {...register("address", {
                  required: "Address is required"
                })}
              />
              <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
              <Input
                type="email"
                placeholder="E-mail"
                variant="flushed"
                focusBorderColor="teal.400"
                errorBorderColor="none"
                id="email"
                {...register("email", {
                  required: "E-mail is required",
                })}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              <Input
                type="password"
                placeholder="Password"
                variant="flushed"
                focusBorderColor="teal.400"
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
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              <Input
                type="password"
                placeholder="Confirm Password"
                variant="flushed"
                id="confirmpassword"
                focusBorderColor="teal.400"
                errorBorderColor="none"
                {...register("confirmpassword",{
                  validate: value => value === password.value || "The passwords do not match"
                })}
              />
               <FormErrorMessage>{errors.confirmpassword && errors.confirmpassword.message}</FormErrorMessage>
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
