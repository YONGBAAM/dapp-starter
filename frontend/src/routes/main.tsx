import React, { FC, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { mintAnimalTokenContract } from "../web3Config";
import AnimalCard from "../components/AnimalCard";

interface MainProps {
  account: string;

}

const Main: FC<MainProps> = ({ account }) => { // 어카운트를 받아오는과정
  const [newAnimalType, setNewAnimalType] = useState<string>()

  const onClickMint = async () => {

    try {
      if (!account) console.error("err")
      const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({ from: account })
      console.log(response)

      if (response.status) {
        const balanceLength = await mintAnimalTokenContract.methods
          .balanceOf(account).call(); // 컨트랙에서 어웨잇 걸ㅓ주네

        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength, 10) - 1).call()

        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(parseInt(animalTokenId, 10)).call();

        console.log('' + animalTokenId + " // 0" + animalType)

        setNewAnimalType(animalType)
      }

    } catch (error) {
      console.error(error)
    }
  };

  return <Flex w="full" h="100vh"
    justifyContent="center" alignItems="center" direction="column">
    <Box>
      {newAnimalType ? <div><AnimalCard animalType={newAnimalType} /></div> : <div>Lets mint card</div>}
    </Box>
    {`type: ${newAnimalType}`}
    <Box>
    </Box>
    <Button mt={4} size="sm" colorScheme="blue" onClick={onClickMint}>mint</Button>
  </Flex>

  return <Box>Main</Box>;
};

export default Main;
