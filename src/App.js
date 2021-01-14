import React, { useEffect, useState } from "react";
import { Flex, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import starwars from "./api/starwars";

import SearchBar from "./components/SearchBar";
import List from "./components/List";
import Detail from "./components/Detail";

const App = () => {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [characters, setCharacters] = useState([]);

  const onSearch = (term) => {
    setTerm(term);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    starwars.get("/people", { params: { search: term } }).then(({ data }) => {
      setCharacters(data.results);
      console.log(data);
    });
  }, [debouncedTerm]);

  useEffect(() => {}, []);

  const { onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Flex justify="center" w="100vw" minH="100vh" bgColor="gray.50">
        <Flex
          w={["95%", "90%", "650px", "800px"]}
          my={6}
          align="center"
          direction="column"
        >
          <SearchBar onSearch={onSearch} />
          <List mt={6} data={characters} />

          {/* <Detail isOpen={true} onClose={onClose} /> */}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
