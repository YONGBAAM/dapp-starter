import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inventory from "./routes/inventory";

import Main from "./routes/main";
import MyAnimal from "./routes/my-animal";
import SaleAnimal from "./routes/sale-animal";

const App: FC = () => {

  const [account, setAccount] = useState<string>("")

  const getAccount = async () => {
    try {
      if (window.ethereum) {// 메마 있어야 실행됨.
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        setAccount(accounts[0])

      }
      else {
        alert("Install Metamask")
      }
    } catch (error) {

      console.error(error)
    }
  }
  useEffect(() => {
    getAccount();

  }, [account])
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main account={account} />} />
          <Route path="my-animal" element={<MyAnimal account={account} />} />
          <Route
            path="sale-animal"
            element={<SaleAnimal account={account} />}
          />
          <Route
            path="inventory"
            element={<Inventory account={account} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
