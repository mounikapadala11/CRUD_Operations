// components/skeleton.js
import React from 'react';
import {Box,Button,HStack, VStack, Spacer, Flex, SimpleGrid, GridItem, Grid} from '@chakra-ui/react'
import AlertRulesTable from './alert_rules_table';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import Menu from './menu';

function skeleton() {

    const buttonStyle = {
        backgroundColor: 'lightgray',
        color: 'darkblue', 
        fontSize: '20px',  
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
      };

  return (
    <Box>

        
        <NavBar/>
    <HStack spacing='30px' padding='10'>
        
        <Box  w='25%' h='600' borderRadius='30' bg='lightBlue' padding="10">
        
        <Menu/>
            
        </Box>

      
            
            
        <Box w='75%' h='600' borderRadius='30' bg='lightBlue' padding='7' >
                
  
             <VStack w="full" align="stretch" padding={'2'}>
                <Box
                    p={2}
                    rounded="md"
                    bg="lightblue"
                >
                     <HStack>

                        <Box w='20%' h='10' alignItem='center'  borderRadius='30' padding='2' fontSize='22px' fontWeight='bold'>Alert Rules</Box>
                          <Spacer/>
                       
                         <Link to="/createAlert">
  <Button w='100%' h='10' colorScheme='blue' variant='solid'  pl='3' boxShadow="xl" borderRadius='10'>+ Create Alert Rule</Button>
</Link>
                        
                    </HStack>
                    </Box>
                    <Box h='50vh' overflowY='auto'borderRadius='10' >
                    <AlertRulesTable/>
                    </Box>
                                        

                </VStack>
        </Box>    

  </HStack>
  
</Box>
  );
}

export default skeleton;