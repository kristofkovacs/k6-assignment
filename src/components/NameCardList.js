import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

import NameCard from "./NameCard";

const List = ({ data, ...props }) => {
  console.log(data);
  return (
    <SimpleGrid
      columns={[1, 1, 1, 2]}
      spacing={[4, 4, 4, 8]}
      {...props}
      w="100%"
    >
      {data &&
        data.map(({ name, species, homeworld, films }) => {
          return (
            <NameCard
              key={name}
              name={name}
              species={species}
              movieLinks={films}
              homeWorld={homeworld}
            />
          );
        })}
    </SimpleGrid>
  );
};

export default List;
