import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  return (
    <InputGroup>
      <Input
        placeholder="Search.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        bgColor="white"
      />
      {searchTerm.length && (
        <InputRightElement width="4.5rem">
          <IconButton
            size="sm"
            color="gray.500"
            onClick={(e) => setSearchTerm("")}
            aria-label="Clear Search"
            variant="ghost"
            icon={<CloseIcon />}
            _hover={{
              background: "white",
              color: "gray.700",
            }}
            _active={{
              background: "white",
              color: "gray.800",
            }}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBar;
