import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import CookieServices from "../services/CookieServices";
import axiosInstance from "../config/axiosInstanse";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

//"Home", "Dashboard", "products", "cart"

const NavBar = () => {
  const userData = CookieServices.get("user");
  const [urlImage, setUrlImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { product } = useSelector((state: RootState) => state.cart);
  const cartItem = product.length;
  const Links = [
    { link: "/", Name: "Home" },
    { link: "dashboard", Name: "Dashboard" },
    { link: "products", Name: "Products" },
  ];
  const Auth = [
    { link: "login", Name: "Login" },
    { link: "register", Name: "Register" },
  ];
  ////////////////////Get Image For User

  const getImage = async () => {
    try {
      const userCookie = CookieServices.get("user");
      if (!userCookie) return;

      const { jwt } = userCookie;

      const response = await axiosInstance.get("/users/me?populate=userImage", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setUrlImage(response.data.userImage.url);
      return response.data.url;
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  };
  useEffect(() => {
    getImage();
  }, []);
  // console.log(`${import.meta.env.VITE_SERVER_URL}${urlImage}`);
  //2- handler
  const logoutUser = () => {
    CookieServices.remove("user");
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box fontSize={{ base: "sm", md: "md", lg: "lg" }}>E-Commerce</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  {link.Name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap={4}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {CookieServices.get("user") && (
              <NavLink
                to={"cart"}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {`Cart (${cartItem})`}
              </NavLink>
            )}
            <Flex h={16} alignItems={"center"} justifyItems={"end"}>
              <HStack spacing={8} alignItems={"center"}>
                {CookieServices.get("user") ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={`${import.meta.env.VITE_SERVER_URL}${urlImage}`}
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={"../../public/img/my-1.jpg"}
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{userData.user.username}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem
                        as={NavLink}
                        onClick={logoutUser}
                        reloadDocument
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  Auth.map((link, index) => (
                    <Box
                      key={index}
                      fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    >
                      <NavLink
                        to={link.link}
                        className={({ isActive }) =>
                          isActive ? "active-link" : ""
                        }
                      >
                        {link.Name}
                      </NavLink>
                    </Box>
                  ))
                )}
              </HStack>
            </Flex>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={3} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  {link.Name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
};

export default NavBar;
