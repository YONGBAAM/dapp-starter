import React, { FC } from "react";
import { Image, Text, Box } from "@chakra-ui/react";

interface AnimalCardProps {
  animalType: string;
}

const AnimalCard: FC<AnimalCardProps> = ({ animalType }) => {
  return (
    // todo: change to text
    <Box>
      <Text>type: {animalType}</Text>
    </Box>

    // 어쩔땐 달러쓰고 어쩔땐 안쓰는거야..
    // <Image w={150} h={150} src={`images/${animalType}.png`} alt="AnimalCard" />
  );
};

export default AnimalCard;