import {
  Box,
  HStack,
  IconButton,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Loading from "../../util/Loading";
import { AxiosRefetch } from "../../util/types";
import UserEditModal from "./UserEditModal";

interface Props {
  refetch: AxiosRefetch;
  profiles: any[];
}

const UserTable: React.FC<Props> = (props) => {
  const [profiles, setProfiles] = useState(props.profiles);
  useEffect(() => {
    if (props.profiles) {
      setProfiles(props.profiles);
    }
  }, [props.profiles]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentModalData, setCurrentModalData] = useState<any>({});

  const handleModalOpen = (defaultValues: any) => {
    setCurrentModalData(defaultValues);
    onOpen();
  };

  const handleModalClose = () => {
    setCurrentModalData({});
    onClose();
  };

  if (!profiles) {
    return <Loading />;
  }

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <HStack spacing="3">
                <HStack spacing="1">
                  <Text>Name</Text>
                </HStack>
              </HStack>
            </Th>
            <Th>Email</Th>
            <Th>Permissions</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {profiles.map((profile) => (
            <Tr key={profile._id}>
              <Td>
                <HStack spacing="3">
                  <Box>
                    <Text fontWeight="medium">
                      {profile.name.first} {profile.name.last}
                    </Text>
                  </Box>
                </HStack>
              </Td>
              <Td>
                <Text color="muted">{profile.email}</Text>
              </Td>
              <Td>
                <Text color="muted">
                  {profile.roles?.member && <Tag m="5px">Member</Tag>}
                  {profile.roles?.admin && <Tag m="5px">Admin</Tag>}
                  {profile.roles?.exec && <Tag m="5px">Exec</Tag>}
                </Text>
              </Td>
              <Td>
                <HStack spacing="1">
                  <IconButton
                    icon={<FiEdit2 fontSize="1.25rem" />}
                    variant="ghost"
                    aria-label="Edit profile"
                    onClick={() => handleModalOpen(profile)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <UserEditModal
        defaultValues={currentModalData}
        isOpen={isOpen}
        onClose={handleModalClose}
        refetch={props.refetch}
      />
    </>
  );
};

export default UserTable;
