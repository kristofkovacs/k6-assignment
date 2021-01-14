import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

import Card from "./Card";

const List = ({ data, ...props }) => {
  console.log(data);
  return (
    <SimpleGrid
      columns={[2, 2, 2, 3]}
      spacing={(2, 2, 10)}
      mx={(2, 2, 0)}
      {...props}
    >
      {data &&
        data.map(({ name, species, homeworld, films }) => {
          return (
            <Card
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
