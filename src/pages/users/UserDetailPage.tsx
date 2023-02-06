import React, { useEffect } from "react";
import {
 Box,
 Heading,
 Text,
 Accordion,
 AccordionItem,
 AccordionButton,
 AccordionPanel,
 AccordionIcon,
 VStack,
 Stack,
 Link,
 Tag,
 TagLabel,
 TagRightIcon,
 useToast,
 Button,
 Select,
 useDisclosure,
 Modal,
 ModalOverlay,
 ModalHeader,
 ModalCloseButton,
 ModalContent,
 ModalBody,
 ModalFooter,
 FormControl,
 FormLabel,
 Input,
 Flex,
 Checkbox,
 Popover,
 PopoverArrow,
 PopoverBody,
 PopoverCloseButton,
 PopoverContent,
 PopoverFooter,
 PopoverTrigger,
} from "@chakra-ui/react";
import { ErrorScreen, LoadingScreen } from "@hex-labs/core";
import axios from "axios";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";


const UserDetailPage: React.FC = () => {
   const { userID } = useParams();
//    const [{ data, loading, error }] = useAxios(
//        apiUrl(Service.USERS, `/users/${userID}`)
//      );
const [{ data, loading, error }] = useAxios({
    method: "GET",
    url: `https://users.api.hexlabs.org/users/${userID}`,
});
if (loading) {
    return (
        <LoadingScreen />
    )
}
if (error) {
    return (
        <p>error</p>
    )
}
   return (
       <Box paddingX={{ base: "10px", sm: "30px" }} paddingTop="20px">
          {data}
       </Box>
   )
};


export default UserDetailPage;