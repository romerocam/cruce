//react
import { useForm } from "react-hook-form";
//next.js
import { useRouter } from "next/router";
// next auth
import { getSession, signIn } from "next-auth/react";
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
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";

import { HiMail } from "react-icons/hi";
import ForgotPassword from "../../src/components/Forgotpassword/ForgotPassword";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const router = useRouter();

  const onSubmit = async (formData) => {
    // formData.preventDefault();

    const loginResult = await signIn("email", {
      redirect: false, // para que no redirija a otra pagina cuando da error el login

      // le paso las credenciales al pedido (signIn)
      email: formData.email,

    });

    router.push("/api/auth/verify-request?provider=email&type=email");
  };

  return (
    <>
      <Layout>
        <ForgotPassword />
      </Layout>
    </>
  );
};

export default ForgotPasswordPage;

// Para proteger la ruta del perfil desde el servidor:
export async function getServerSideProps(context) {

  // console.log("CONTEXT", context)

  const session = await getSession({ req: context.req })

  //console.log("SESSION", session)

  if (session) {
    return {
      redirect: {
        destination: '/users/set-password',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }
}