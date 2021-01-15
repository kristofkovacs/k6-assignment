import React, { useState, useEffect } from "react";

import starwars from "../api/starwars";
import axios from "axios";
import Moment from "moment";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Heading,
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
  }, [movieLinks]);

  useEffect(() => {
    if (movies.length) {
      setLoading(false);
    }
    console.log(loading);
  }, [movies]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pt={6} bg="gray.600">
        <ModalHeader color="yellow.200" fontWeight="semibold" fontSize={26}>
          {name} appeared in the following movies:
        </ModalHeader>

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
                emptyColor="red.50"
                color="red.600"
                size="lg"
              />
            </Flex>
          ) : (
            <>
              {movies.map(
                ({ data: { title, release_date, opening_crawl } }) => {
                  return (
                    <Flex
                      py={4}
                      px={6}
                      direction="column"
                      borderRadius={10}
                      bgColor="gray.700"
                      mt={4}
                    >
                      <Heading as="h3" size="md" color="yellow.300">
                        {title}
                      </Heading>
                      <Text fontWeight="semibold" color="gray.400" mt={1}>
                        Released on{" "}
                        <b>{`${Moment(release_date).format(
                          "MMMM DD, YYYY"
                        )}`}</b>
                      </Text>
                      <Text mt={4} color="gray.200" fontWeight="semibold">
                        Short description:
                      </Text>
                      <Text mt={1} color="gray.100">
                        {`${opening_crawl.substring(0, 150)}...`}
                      </Text>
                    </Flex>
                  );
                }
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Detail;
