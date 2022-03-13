import React, { ChangeEvent, FC, useState } from "react";
import { Image, Text, Box, Button, InputGroup, Input, InputLeftAddon, Flex, InputRightAddon } from "@chakra-ui/react";
import axios from "axios";

export interface InventoryItemProps {
    itemId: number;
    nftId: number;
    ownerWalletAddress: string;
    nftDescription: string
    account:string
}

const InventoryItem: FC<InventoryItemProps> = ({ itemId, nftId, ownerWalletAddress, nftDescription , account}) => {

    const [password, setPassword] = useState<string>('');

    const wallet = ownerWalletAddress
    const trimWallet = wallet.length > 10 ?
        wallet.substring(0, 4) + ".." + wallet.substring(wallet.length - 5, wallet.length)
        : wallet;

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const url = "http://localhost:10001"

    const onClickRetrieve = async () => {
        try {
            const response = await axios.post(url + "/items/retrieve", {
                "postId":itemId, "password":password, "address":account
            })
            alert(response)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        // todo: change to text
        // todo: add id

        <Flex w="full" h="5vh" justifyContent="left" alignItems="center" direction="row">
            <Text >id: {itemId} nftId: {nftId} w: {trimWallet} {nftDescription} </Text>

            <InputGroup >
                <Input
                    w="10vh"
                    type="string"
                    value={password}
                    onChange={onChangePassword}


                />
                <InputRightAddon children="password" />
            </InputGroup>
            <Button
                size="sm"
                colorScheme="blue"
                onClick={onClickRetrieve}

            >
                retrieve
            </Button>
        </Flex>

        // 어쩔땐 달러쓰고 어쩔땐 안쓰는거야..
        // <Image w={150} h={150} src={`images/${animalType}.png`} alt="AnimalCard" />
    );
};

export default InventoryItem;