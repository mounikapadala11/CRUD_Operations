import React, { useEffect, useState } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import NavBar from './NavBar';
import Menu from './menu';
import AlertTable from './alert_table';
import { getAlerts } from '../services/alert'; // Adjust this import path based on your project structure

function ListAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts()
      .then(data => {
        setAlerts(data);
      })
      .catch(error => {
        console.error('Error fetching alerts:', error);
      });
  }, []);

  return (
    <Box>
      <NavBar />
      <HStack spacing='30px' padding='10'>
        <Box w='25%' h='600px' borderRadius='30' bg='lightBlue' padding="10">
          <Menu />
        </Box>
        
        <Box w='75%' h='600px' borderRadius='30' bg='lightBlue' padding='7'>
          <VStack w="full" align="stretch" padding={'2'}>
            <Box p={2} rounded="md" bg="lightblue">
              <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>Alerts</h2>
            </Box>
            <Box h='50vh' overflowY='auto' borderRadius='10'>
            <AlertTable alerts={alerts} />
            </Box>
          </VStack>
        </Box>    
      </HStack>
    </Box>
  );
}

export default ListAlerts;



