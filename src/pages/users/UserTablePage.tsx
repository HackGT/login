import React, { useMemo, useState } from "react";
import { Tag, IconButton, useDisclosure, Text } from "@chakra-ui/react";
import { ErrorScreen, SearchableTable } from "@hex-labs/core";
import useAxios from "axios-hooks";
import { FiEdit2 } from "react-icons/fi";
import UserEditModal from "./UserEditModal";

const limit = 50;

const AllApplicationsTable: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [{ data, error }, refetch] = useAxios({
    method: "GET",
    url: "https://users.api.hexlabs.org/users",
    params: {
      search: searchText,
      offset,
    },
  });

  const onPreviousClicked = () => {
    setOffset(offset - limit);
  };
  const onNextClicked = () => {
    setOffset(offset + limit);
  };
  const onSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
    setOffset(0);
  };

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

  const columns = useMemo(
    () => [
      {
        key: 0,
        header: "Name",
        accessor: (row: any) => (
          <Text fontWeight="medium">
            {row.name.first} {row.name.last}
          </Text>
        ),
      },
      {
        key: 1,
        header: "Email",
        accessor: (row: any) => row.email,
      },
      {
        key: 2,
        header: "Permissions",
        accessor: (row: any) => (
          <>
            {row.roles?.member && <Tag m="5px">Member</Tag>}
            {row.roles?.admin && <Tag m="5px">Admin</Tag>}
            {row.roles?.exec && <Tag m="5px">Exec</Tag>}
          </>
        ),
      },
      {
        key: 3,
        header: "Actions",
        accessor: (row: any) => (
          <IconButton
            icon={<FiEdit2 fontSize="1.25rem" />}
            variant="ghost"
            aria-label="Edit profile"
            onClick={() => handleModalOpen(row)}
          />
        ),
      },
    ],
    []
  );

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <>
      <SearchableTable
        title="Users"
        data={data?.profiles}
        columns={columns}
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        onPreviousClicked={onPreviousClicked}
        onNextClicked={onNextClicked}
        offset={offset}
        total={data?.total}
      />
      <UserEditModal
        defaultValues={currentModalData}
        isOpen={isOpen}
        onClose={handleModalClose}
        refetch={refetch}
      />
    </>
  );
};

export default AllApplicationsTable;
