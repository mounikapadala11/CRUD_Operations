// components/skeleton.js
import React from 'react';
import {Box,Button,HStack, VStack, Spacer, Flex, SimpleGrid, Grid} from '@chakra-ui/react'
import AlertRulesTable from './alert_rules_table';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

function menu() {


  return (
    <Box>
<Grid gap='30px'>
  <Link to="/">
    <Button
      boxShadow="lg"
      borderRadius='10'
      bg='white'
      minWidth="100%"
      w='full'
      _hover={{ boxShadow: "5xl" , border: '1px solid black' }}
      _focus={{ border: '1px solid black' }}
    >
      Alert Rules
    </Button>
  </Link>
  <Link to='/listAlerts'>
    <Button
    boxShadow="lg"
      borderRadius='10'
      bg='white'
      minWidth="100%"
      w='full'
      _hover={{ boxShadow: "5xl" , border: '1px solid black' }}
      _focus={{ border: '1px solid black' }}
    >
      Alerts
    </Button>
  </Link>
</Grid>
 </Box>

      
  );
}

export default menu;