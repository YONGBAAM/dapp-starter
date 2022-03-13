
import React, { FC, useEffect, useState } from "react";
import { Button, List, ListItem, OrderedList, Text } from "@chakra-ui/react"
import InventoryItem, { InventoryItemProps } from "../components/InventoryItem";

import axios from "axios"

interface InventoryProps {
    account: string;

}
const url = "http://localhost:10001"

const Inventory: FC<InventoryProps> = ({ account }) => {

    const [itemList, setItemList] = useState<InventoryItemProps[]>([])

    const [resp, setResp] = useState();

    const getItemList = async () => {
        try {
            const response = await axios.get(url + "/items")
            const tt: InventoryItemProps[] = [];
            response.data.map((v: InventoryItemProps) => {
                tt.push(v)
            })
            setItemList(tt)
            console.log(response.data)
            console.log(itemList)


        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getItemList();
    }, [])

    return (
        <List>
            {itemList &&
                itemList.map((v, i) => {
                    return <ListItem key={i}>
                        <InventoryItem account = {account} nftId={v.nftId} nftDescription={v.nftDescription} itemId={v.itemId} ownerWalletAddress={v.ownerWalletAddress} />
                    </ListItem>
                })}

        </List>
    )
}

export default Inventory