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
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../providers/AuthProvider";

const Login = () => {
  const data = useAuth();
  const navigate = useNavigate();

  const [input, setInput] = useState({ username: "", password: "" });
  const [inputError, setInputError] = useState({ username: "", password: "" });
  const [credentialsError, setCredentialsError] = useState("");

  const setInputFieldError = (field, message) => {
    setInputError((prevInputError) => ({
      ...prevInputError,
      [field]: message,
    }));
  };

  const handleLogin = async () => {
    let email = input.username;
    let password = input.password;

    /* Validate input fields */
    let errorOccurred = false;

    if (email === "") {
      setInputFieldError("username", "This field is required");
      errorOccurred = true;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setInputFieldError("username", "Invalid email address");
      errorOccurred = true;
    }

    if (password === "") {
      setInputFieldError("password", "This field is required");
      errorOccurred = true;
    }

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

  return (
    <Center h="100vh">
      <Box w="xl" p={4} borderRadius="lg" boxShadow="lg">
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
        <FormControl mt={4} isInvalid={inputError.password}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={input.password}
            onChange={handleInputChange}
            placeholder="password"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <FormErrorMessage>{inputError.password}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
        {credentialsError && (
          <Text color="red.300" mt={4} fontSize="lg">
            {credentialsError}
          </Text>
        )}
      </Box>
    </Center>
  );
};

export default Login;
