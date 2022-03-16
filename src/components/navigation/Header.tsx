import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, chakra, Container, CloseButton, Drawer, DrawerContent, IconButton, Image, useDisclosure, Stack } from "@chakra-ui/react";
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

const NavbarItem = chakra(Link, {
  baseStyle: {
    minWidth: "65px"
  }
});

const SidebarContainer = chakra(Stack, {
  baseStyle: {
    textAlign: "center",
    fontSize: "18px",
    spacing: "20px",
    paddingTop: "15px"
  }
});

const Header: React.FC<{routes: Page[]}> = props => {
  const location = `/${useLocation()?.pathname.split("/")[1]}`;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logOut = async () => {
    signOut(auth);

    await axios.post(
      "https://users.api.hexlabs.org/auth/logout",
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
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onOpen}
            icon={<HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Box>
        <Image src={Logo} />
        <Box
          display="flex"
        >
          <Box
            display={{ base: "none", md: "flex" }}
            width="fit-content"
          >
            {props.routes.slice(1).map(route => (
              <NavbarItem
                key={route.name}
                to={route.link}
                paddingLeft="48px"
                borderBottomColor={location === route.link ? "#7b69ec" : "0xffffff"}
              >
                {route.name}
              </NavbarItem>
            ))}
          </Box>
          <Box
            display="flex"
            width="fit-content"
            ml={{ base: 5 }}
            mr={{ base: -3 }}
          >
            <NavbarItem
              key={props.routes[0].name}
              to={props.routes[0].link}
              paddingLeft={{ base:"0", md:"48px" }}
              onClick={props.routes[0].name === "Sign Out" ? logOut : () => {}}
              borderBottomColor={location === props.routes[0].link ? "#7b69ec" : "0xffffff"}
            >
              {props.routes[0].name}
            </NavbarItem>
          </Box>
        </Box>
      </NavbarContainer>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent
          display={{ base: "flex", md: "none" }}
        >
          <Box
            borderRight="1px"
            pos="fixed"
            h="full"
            w="full"
          >
            <Box display="flex" h="20" alignItems="center" mx="8" justifyContent="space-between">
              <Image src={Logo} />
              <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Box>
            <SidebarContainer>
              {props.routes.slice(1).map(route => (
                <Link
                  key={route.name}
                  to={route.link}
                  onClick={onClose}
                >
                  {route.name}
                </Link>
              ))}
            </SidebarContainer>
          </Box>
        </DrawerContent>
      </Drawer>
  </>
  );
};

export default Header;