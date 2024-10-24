import { Button } from "@chakra-ui/react";

import { useAuth } from "../../providers/AuthProvider";

const Logout = () => {
  const { token, handleLogout } = useAuth();

  // Check if token exists, if not, return null (i.e., don't render the Logout button)
  if (!token || token === "") return null;

  return (
    <Button
      colorScheme="red"
      onClick={handleLogout}
      size="md"
      variant="outline"
      position="absolute"
      top="1.1rem"
      right="5rem"
    >
      Logout
    </Button>
  );
};

export default Logout;
