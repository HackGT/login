import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  chakra,
  Container,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Image,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import axios from "axios";

import { Page } from "./Navigation";
import Logo from "../../assets/hexlabs.svg";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../util/firebase";

const auth = getAuth(app);

const NavbarContainer = chakra(Container, {
  baseStyle: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "64px",
    px: "30px",
    bg: "white",
    boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 8%)",
  },
});

const NavbarItem: React.FC<{ route: Page; func: () => any }> = (props) => (
  <Box minWidth="65px" paddingLeft={{ base: "0", md: "48px" }}>
    <Link key={props.route.name} to={props.route.link} onClick={props.func}>
      {props.route.name}
    </Link>
  </Box>
);

const SidebarContainer = chakra(Stack, {
  baseStyle: {
    textAlign: "center",
    fontSize: "18px",
  },
});

const SidebarItem: React.FC<{ route: Page; func: () => any }> = (props) => (
  <Link
    style={{ lineHeight: "48px" }}
    key={props.route.name}
    to={props.route.link}
    onClick={props.func}
  >
    {props.route.name}
  </Link>
);

const Header: React.FC<{ routes: Page[] }> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logOut = async () => {
    signOut(auth);

    await axios.post(
      "https://auth.api.hexlabs.org/auth/logout",
      {},
      { withCredentials: true }
    );
  };

  return (
    <>
      <NavbarContainer as="header">
        <Box
          minWidth="65px"
          ml={{ base: -3 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onOpen}
            icon={<HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Box>
        <Image src={Logo} />
        <Box display="flex">
          <Box display={{ base: "none", md: "flex" }} width="fit-content">
            {props.routes.map(
              (route) =>
                route.link !== "/login" && (
                  <NavbarItem
                    route={route}
                    func={route.name === "Sign Out" ? logOut : () => {}}
                  />
                )
            )}
          </Box>
          <Box
            display="flex"
            width="fit-content"
            ml={{ base: 4 }}
            mr={{ base: -3 }}
          >
            {props.routes.map(
              (route) =>
                route.link === "/login" && (
                  <NavbarItem
                    route={route}
                    func={route.name === "Sign Out" ? logOut : () => {}}
                  />
                )
            )}
          </Box>
        </Box>
      </NavbarContainer>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        autoFocus={false}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerOverlay />
        <DrawerContent display={{ base: "flex", md: "none" }}>
          <DrawerHeader>
            <Box
              display="flex"
              h="20"
              alignItems="center"
              ml="12"
              justifyContent="space-between"
            >
              <Image src={Logo} />
              <CloseButton
                display={{ base: "flex", md: "none" }}
                onClick={onClose}
              />
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <SidebarContainer>
              {props.routes.map((route) => (
                <SidebarItem route={route} func={onClose} />
              ))}
            </SidebarContainer>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
