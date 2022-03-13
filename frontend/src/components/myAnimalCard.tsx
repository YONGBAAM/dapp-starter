import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightAddon,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { ChangeEvent, FC, useState } from "react";
import { mintAnimalTokenContract, saleAnimalTokenContract, web3 } from "../web3Config";

import AnimalCard from "./AnimalCard";

export interface IMyAnimalCard {
    animalTokenId: string;
    animalType: string;
    animalPrice: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {
    saleStatus: boolean;
    account: string;
}

const MyAnimalCard: FC<MyAnimalCardProps> = ({
    animalTokenId,
    animalType,
    animalPrice,
    saleStatus,
    account,
}) => {

    const [sellPrice, setSellPrice] = useState<string>(""); // 입력값변화는 이런식으로 가져감

    const [password, setPassword] = useState<string>(""); // 입력값변화는 이런식으로 가져감

    // 이건 판매시 새로고침 안되게 하기 위해 유즈스테이트로 잡음. 
    const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);

    const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setSellPrice(e.target.value);
    };

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onClickSell = async () => {
        try {
            if (!account || !saleStatus) return;

            const response = await saleAnimalTokenContract.methods
                .setForSaleAnimalToken(
                    animalTokenId,
                    web3.utils.toWei(sellPrice, "ether")
                )
                .send({ from: account }); // 등록하는건 센드. 조회하는건 콜.

            if (response.status) {
                setMyAnimalPrice(web3.utils.toWei(sellPrice, "ether"));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const url = "http://localhost:10001"
    const changgo = "0xc9B7F6CB9Ee166f4d113B5394A05E346048628d1"

    const onClickDeposit = async () => {
        try {
            mintAnimalTokenContract.methods.safeTransferFrom(account, changgo, parseInt(animalTokenId,10)).send({ from: account });

            const response = await axios.post(url + "/items/deposit", {
                "nftId":animalTokenId, "password":password, "walletAddress":account, "description":"test"
            })
            console.log(response)
        } catch (error) {
            console.error
        }
    }

    return (// 상속이 아니라 인스턴스로 해결하네
        <Box textAlign="center" w={150}>
            <AnimalCard animalType={animalType} />
            <Box mt={2}>
                {myAnimalPrice === "0" ? (
                    <>
                        <InputGroup>
                            <Input
                                type="number"
                                value={sellPrice}
                                onChange={onChangeSellPrice}
                            />
                            <InputRightAddon children="Matic" />
                        </InputGroup>
                        <Button size="sm" colorScheme="green" mt={2} onClick={onClickSell} display= "inline-block">
                            Sell
                        </Button>
                        <InputGroup>
                        <Input
                            type="string"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </InputGroup>
                    <Button size="sm" colorScheme="blue" mt={2} onClick={onClickDeposit} display= "inline-block">
                        Deposit
                    </Button>
                    </> // 판매버튼
                ) : (
                    <Text d="inline-block">{web3.utils.fromWei(myAnimalPrice)} Matic</Text>
                )}
            </Box>
        </Box>
    );
};

export default MyAnimalCard;