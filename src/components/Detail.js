import React, { useState, useEffect } from "react";

import starwars from "../api/starwars";
import axios from "axios";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Button,
  Spinner,
} from "@chakra-ui/react";

const Detail = ({ isOpen, onClose, movieLinks, name }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let axiosRequests = [];
    movieLinks.forEach((movieLink) => {
      axiosRequests.push(starwars.get(movieLink));
    });
    axios.all(axiosRequests).then(
      axios.spread((...responses) => {
        setMovies(responses);
      })
    );
  }, []);

  useEffect(() => {
    if (movies.length) {
      setLoading(false);
    }
    console.log(loading);
  }, [movies]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name} appeared in the following movies:</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
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
              />
            </Flex>
          ) : (
            <>
              {movies.map(
                ({ data: { title, release_date, opening_crawl } }) => {
                  return (
                    <Flex bg="gray.200" m={2} p={2} direction="column">
                      <Text>Title: {title}</Text>
                      <Text>Release date: {release_date}</Text>
                      <Text>
                        Description: {`${opening_crawl.substring(0, 150)}...`}
                      </Text>
                    </Flex>
                  );
                }
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Detail;
