import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  ChakraProvider,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import starwars from "./api/starwars";

import SearchBar from "./components/SearchBar";
import List from "./components/List";

const App = () => {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [characters, setCharacters] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(true);

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
      const { previous, next, results } = data;
      setPrevious(previous);
      setNext(next);
      setCharacters(results);
      setLoading(false);
    });
  }, [debouncedTerm]);

  const pageChange = (link) => {
    console.log(link);
    setLoading(true);
    starwars.get(link, { params: { search: term } }).then(({ data }) => {
      const { previous, next, results } = data;
      setPrevious(previous);
      setNext(next);
      setCharacters(results);
      setLoading(false);
    });
  };

  useEffect(() => {}, []);
  return (
    <ChakraProvider>
      <Flex justify="center" w="100vw" minH="100vh" bgColor="gray.50">
        <Flex
          w={["95%", "90%", "650px", "800px", "1000px"]}
          my={6}
          align="center"
          direction="column"
        >
          <SearchBar onSearch={onSearch} />
          {loading ? (
            <Flex
              justify="center"
              align="center"
              justifySelf="center"
              alignSelf="center"
              py={12}
            >
              <Spinner
                thickness="4px"
                speed="0.5s"
                emptyColor="gray.200"
                color="teal.500"
                size="lg"
                mt={64}
              />
            </Flex>
          ) : (
            <List mt={6} data={characters} />
          )}
          <Flex mt={8}>
            <Button
              mr={4}
              leftIcon={<ChevronLeftIcon />}
              isDisabled={!previous}
              onClick={(e) => pageChange(previous)}
            >
              Previous page
            </Button>
            <Button
              rightIcon={<ChevronRightIcon />}
              isDisabled={!next}
              onClick={(e) => pageChange(next)}
            >
              Next page
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
