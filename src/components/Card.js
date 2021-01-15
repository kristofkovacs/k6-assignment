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
      if (population !== "unknown") {
        setHomeWorldInfos({
          name: name,
          population: population.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        });
      } else {
        setHomeWorldInfos({ name: name, population: population });
      }
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
          <Heading as="h2" size="lg" color="red.600">
            {name}
          </Heading>
          <Text fontWeight="semibold" color="gray.700">
            Species: <b>{speciesName}</b>
          </Text>
          {homeWorldInfos.population === "unknown" ? (
            <Text fontWeight="semibold" color="gray.700" mt={4}>
              Their home planet is <b>{homeWorldInfos.name}</b> with{" "}
              <b>{homeWorldInfos.population}</b> population number
            </Text>
          ) : (
            <Text fontWeight="semibold" color="gray.700" mt={4}>
              Their home planet is <b>{homeWorldInfos.name}</b> with a
              population count of <b>{homeWorldInfos.population}</b>
            </Text>
          )}
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
