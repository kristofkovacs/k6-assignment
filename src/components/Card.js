import React, { useState, useEffect } from "react";
import { Flex, Text, Heading, useDisclosure } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import starwars from "../api/starwars";

import Detail from "./Detail";

const Card = ({ name, species, homeWorld, movieLinks, ...props }) => {
  const [speciesName, setSpeciesName] = useState("");
  const [homeWorldInfos, setHomeWorldInfos] = useState({});

  useEffect(() => {
    if (species.length) {
      starwars.get(species[0]).then((result) => {
        setSpeciesName(result.data.name);
      });
    } else {
      setSpeciesName("Human");
    }
  }, []);

  useEffect(() => {
    starwars.get(homeWorld).then(({ data: { name, population } }) => {
      setHomeWorldInfos({ name: name, population: population });
    });
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        minW={["100%", "100%", "350px"]}
        py={4}
        px={6}
        align="center"
        justify="space-between"
        borderRadius={10}
        _hover={{ transform: "scale(1.05)" }}
        transition="all 0.15s ease-in-out"
        bgColor="white"
        style={{ cursor: "pointer" }}
        onClick={onOpen}
        {...props}
      >
        <Flex direction="column">
          <Heading as="h2" size="lg" color="teal.500">
            {name}
          </Heading>
          <Text isTruncated noOfLines={3}>
            Species: {speciesName}
          </Text>
          <Text isTruncated noOfLines={3}>
            Home Planet: {homeWorldInfos.name}
          </Text>
          <Text isTruncated noOfLines={3}>
            Population: {homeWorldInfos.population}
          </Text>
        </Flex>
        <ChevronRightIcon h={6} w={6} />
      </Flex>
      {isOpen && (
        <Detail
          isOpen={isOpen}
          onClose={onClose}
          name={name}
          movieLinks={movieLinks}
        />
      )}
    </>
  );
};

export default Card;
