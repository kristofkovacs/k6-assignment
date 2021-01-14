import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Card = ({ image, name, ...props }) => {
  return (
    <Flex
      w={["140px", "200px", "250px"]}
      h={["140px", "200px", "250px"]}
      justify="center"
      align="flex-end"
      borderRadius={10}
      _hover={{ transform: "scale(1.05)" }}
      transition="all 0.15s ease-in-out"
      bgColor="white"
      style={{ cursor: "pointer" }}
      {...props}
    >
      <Text isTruncated noOfLines={3}>
        {name}
      </Text>
      <ChevronRightIcon h={6} w={6} />
    </Flex>
  );
};

export default Card;
