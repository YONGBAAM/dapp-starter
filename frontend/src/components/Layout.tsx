import React, { FC } from "react";
import { Stack, Flex, Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Layout: FC = ({ children }) => { // size  = " 하면 이렇게 자동완성 나오네
  return (
    <Stack h="100vh">
      <Flex
        bg="purple.200"
        p={4}
        justifyContent="space-around"
        alignItems="center"
      >
        <Box>
          <Text fontWeight="bold">h662-Animals</Text>
        </Box>

        <Link to="/">

          <Button size="sm" colorScheme="blue">
            Main
          </Button>
        </Link>
        <Link to="my-animal">
          <Button size="sm" colorScheme="red">
            My Animal
          </Button>
        </Link>
        <Link to="sale-animal">
          <Button size="sm" colorScheme="green">
            Sale Animal
          </Button>
        </Link>
        <Link to="inventory">
          <Button size="sm" colorScheme="purple">
            Inventory
          </Button>
        </Link>
      </Flex>
      <Flex
        direction="column"
        h="full"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Flex>
    </Stack>
  );
};

export default Layout;