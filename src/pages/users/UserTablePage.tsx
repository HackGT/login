import React, { useEffect, useMemo } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import UserTable from "./UserTable";

const limit = 50;

const UserTablePage: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [{ data, loading, error }, refetch] = useAxios(
    `https://users.api.hexlabs.org/users?offset=${offset}&limit=${limit}&search=${searchText}`
  );

  const hasPrevious = useMemo(() => {
    return offset > 0;
  }, [offset]);
  const hasNext = useMemo(() => {
    if (!data?.total) {
      return false;
    }
    return data.total > offset + limit;
  }, [data, offset]);

  const handlePrevious = () => {
    if (hasPrevious) {
      setOffset(offset - limit);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setOffset(offset + limit);
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
    setOffset(0);
  };

  const [resultsText, setResultsText] = useState("Loading...");
  useEffect(() => {
    if (data && data.count > 0) {
      setResultsText(
        `Showing ${offset + 1} to ${offset + data.count} of ${
          data.total
        } results`
      );
    } else if (data) {
      setResultsText(`Showing 0 results`);
    }
  }, [data, offset]);

  return (
    <Box bg="bg-surface">
      <Stack spacing="5">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            <Heading>Users</Heading>
            <InputGroup maxW="xs">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="muted" boxSize="5" />
              </InputLeftElement>
              <Input
                placeholder="Search"
                value={searchText}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Stack>
        </Box>
        <Box overflowX="auto">
          <UserTable profiles={data?.profiles} refetch={refetch} />
        </Box>
        <Box px={{ base: "4", md: "6" }} pb="5">
          <HStack spacing="3" justify="space-between">
            {!isMobile && (
              <Text color="muted" fontSize="sm">
                {resultsText}
              </Text>
            )}
            <ButtonGroup
              spacing="3"
              justifyContent="space-between"
              width={{ base: "full", md: "auto" }}
              variant="secondary"
            >
              <Button disabled={!hasPrevious} onClick={handlePrevious}>
                Previous
              </Button>
              <Button disabled={!hasNext} onClick={handleNext}>
                Next
              </Button>
            </ButtonGroup>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserTablePage;
