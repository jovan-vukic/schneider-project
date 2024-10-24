import {
  Center,
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../providers/AuthProvider";
import { validateEmailAndPassword } from "../../utils/authUtils";

const Login = () => {
  const data = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [input, setInput] = useState({ username: "", password: "" });
  const [inputError, setInputError] = useState({ username: "", password: "" });
  const [credentialsError, setCredentialsError] = useState("");

  const isSignUpPage = location.pathname === "/signup";

  const setInputFieldError = (field, message) => {
    setInputError((prevInputError) => ({
      ...prevInputError,
      [field]: message,
    }));
  };

  const handleLogin = async () => {
    const email = input.username;
    const password = input.password;

    /* Validate input fields */
    const errorOccurred = validateEmailAndPassword(
      email,
      password,
      setInputFieldError
    );

    /* Validate email address */
    if (errorOccurred) return;
    await data.handleLogin(email, password).then((res) => {
      if (res === "Success") {
        navigate("/home");
      } else {
        setCredentialsError(res);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    /* Save input value */
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    /* Clear input field errors */
    setInputError((prevInputError) => ({
      ...prevInputError,
      [name]: "",
    }));
  };

  const handleSignUp = async () => {
    const email = input.username;
    const password = input.password;

    const errorOccurred = validateEmailAndPassword(
      email,
      password,
      setInputFieldError
    );

    if (errorOccurred) return;

    const response = await data.handleSignUp(email, password, "USER");

    if (response === "Success") {
      setInput({ username: "", password: "" });
      navigate("/login");
    } else {
      setCredentialsError(response);
    }
  };

  return (
    <Center h="100vh" flexDir="column">
      <Text fontSize="4xl" fontWeight="bold" mb={8}>
        {isSignUpPage ? "Sign Up" : "Login"}
      </Text>
      <Box
        w="xl"
        p={4}
        borderRadius="lg"
        border={"1px"}
        borderColor={"gray.500"}
      >
        <FormControl isInvalid={inputError.username}>
          <FormLabel>Email</FormLabel>
          <Input
            name="username"
            type="email"
            value={input.username}
            onChange={handleInputChange}
            placeholder="email@example.com"
          />
          <FormErrorMessage>{inputError.username}</FormErrorMessage>
        </FormControl>
        <FormControl mt={8} isInvalid={inputError.password}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={input.password}
            onChange={handleInputChange}
            placeholder="password"
            onKeyDown={(e) =>
              e.key === "Enter" &&
              (isSignUpPage ? handleSignUp() : handleLogin())
            }
          />
          <FormErrorMessage>{inputError.password}</FormErrorMessage>
        </FormControl>
        <Button
          my={8}
          colorScheme="blue"
          onClick={isSignUpPage ? handleSignUp : handleLogin}
        >
          {isSignUpPage ? "Sign Up" : "Login"}
        </Button>
        {credentialsError && (
          <Text color="red.300" mt={4} fontSize="lg">
            {credentialsError}
          </Text>
        )}
      </Box>
      <Text fontSize="md" mt={4}>
        Do you have an account?{" "}
        <a
          style={{
            color: "teal",
            cursor: "pointer",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
          href={isSignUpPage ? "/login" : "/signup"}
        >
          {isSignUpPage ? "Login" : "Sign Up"}
        </a>
      </Text>
    </Center>
  );
};

export default Login;
