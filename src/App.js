import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  ChakraProvider,
  Spinner,
  Heading,
  Image,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import starwars from "./api/starwars";

import SearchBar from "./components/SearchBar";
import NameCardList from "./components/NameCardList";

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
    setLoading(true);
    const timerId = setTimeout(() => {
      if (debouncedTerm === term) {
        setLoading(false);
      }
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
    setLoading(true);
    starwars.get(link, { params: { search: term } }).then(({ data }) => {
      const { previous, next, results } = data;
      setPrevious(previous);
      setNext(next);
      setCharacters(results);
      setLoading(false);
    });
  };

  return (
    <ChakraProvider>
      <Flex justify="center" w="100vw" minH="100vh" bgColor="gray.800">
        <Flex
          w={["95%", "90%", "650px", "800px", "1000px"]}
          my={6}
          align="center"
          direction="column"
        >
          <Image src="/sw_logo.svg" w={[48, 64]} mb={4} />
          <SearchBar onSearch={onSearch} />
          {loading ? (
            <Flex
              justify="center"
              align="center"
              justifySelf="center"
              alignSelf="center"
              py={[12, 12, 20, 64]}
            >
              <Spinner
                thickness="4px"
                speed="0.5s"
                emptyColor="red.50"
                color="red.600"
                size="lg"
              />
            </Flex>
          ) : characters.length ? (
            <>
              <NameCardList mt={6} data={characters} />
              <Flex mt={8} pb={[8, 8, 0]}>
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
            </>
          ) : (
            <Flex
              justify="center"
              align="center"
              py={[12, 12, 20, 64]}
              px={[4]}
            >
              <Heading
                as="h4"
                fontSize={[24, 24, 32]}
                color="gray.200"
                textAlign="center"
                maxW={500}
              >
                No results for this term. Please try searching for a valid Star
                Wars character...
              </Heading>
            </Flex>
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
