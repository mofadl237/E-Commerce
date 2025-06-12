import { Box, Text } from "@chakra-ui/react";
import CookieServices from "../services/CookieServices";

const HomePage = () => {
 


  const userData = CookieServices.get("user");

// const decoded = decodeURIComponent(encodedData);


// const data = decoded;

// console.log("Data ====> ",userData.user.username)
  return (
    <div>
      <Box w="100%" h="200px" bgGradient="linear(to-t, green.200, pink.500)" />

      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        {userData.user.username}
      </Text>
    </div>
  );
};

export default HomePage;
