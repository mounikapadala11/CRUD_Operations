// components/NavBar.js
import React from 'react';
import { Flex, Box, Image, Text } from '@chakra-ui/react';
import logo from '../img/logo.png'; 

function NavBar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.9rem"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" // This adds shadow
    >
      <Flex align="center" mr={5}>
        <Box>
          <Image src={logo} alt="Logo" boxSize="50px" />
        </Box>
        <Text fontSize="xl" fontWeight="bold" ml={3}>
          Oodle.AI
        </Text>
      </Flex>
    </Flex>
  );
}

export default NavBar;
