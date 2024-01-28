import React, { useEffect, useState } from 'react';
import { useAlert } from './AlertContext';
import { getAlertById } from '../services/alert';
import { Box, Text, VStack, HStack, Spacer,SimpleGrid , Grid,GridItem } from '@chakra-ui/react';
import NavBar from './NavBar';
import Menu from './menu';

function AlertDetails() {
  const { currentAlert } = useAlert();
  const [alertDetails, setAlertDetails] = useState(null);

  useEffect(() => {
    if (currentAlert && currentAlert.id) {
      getAlertById(currentAlert.id)
        .then(data => setAlertDetails(data))
        .catch(error => console.error('Error fetching alert details:', error));
    }
  }, [currentAlert]);

  if (!alertDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <NavBar />
      <HStack spacing='30px' padding='10'>
        <Box w='25%' h='600px' borderRadius='30' bg='lightBlue' padding="10">
          <Menu />
        </Box>

      <Box w='75%' h='600' borderRadius='30' bg='lightBlue' padding='10'>
      <Box padding="2">
      <Text fontSize="2xl" fontWeight="bold">
          AlertDetails
        </Text>
        </Box>
        <Box padding='2' w='50%' > 
      <SimpleGrid columns={2}  spacingX='10px' >
     {/* Left Column */}
    <VStack align="start">
      <Text>
        <strong>Alert Name:</strong>
      </Text>
      <Text>
        <strong>Alert Rule UUID:</strong>
      </Text>
      <Text>
        <strong>Expression:</strong>
      </Text>
      <Text>
        <strong>Status:</strong>
      </Text>
      <Text>
        <strong>Starts At:</strong>
      </Text>
      <Text>
        <strong>Ends At:</strong>
      </Text>
      <Text>
        <strong>Last Updated:</strong>
      </Text>
    </VStack>

    {/* Right Column */}
    <VStack align="start">
      <Text>
        {alertDetails.name}
      </Text>
      <Text overflowX='visible' whiteSpace='nowrap'>
        {alertDetails.alertRuleUUID}
      </Text>
      <Text>
        {alertDetails.expression}
      </Text>
      <Text>
        {alertDetails.status}
      </Text>
      <Text>
        {new Date(alertDetails.startsAt).toLocaleString()}
      </Text>
      <Text>
        {new Date(alertDetails.endsAt).toLocaleString()}
      </Text>
      <Text>
        {new Date(alertDetails.updatedAt).toLocaleString()}
      </Text>
    </VStack>
    
    {/* Left Column for Labels */}
    <VStack align="start">
      <Text>
        <strong>Annotations:</strong>
      </Text>
      <Text>
        <strong>Labels:</strong>
      </Text>
     
    </VStack>
    
    {/* Right Column for Labels */}
    <VStack align="start">
    {alertDetails.annotations.map((annotation, index) => (
        <Text key={index}>{annotation.name}: {annotation.value}</Text>
      ))}
      
      {alertDetails.labels.map((label, index) => (
        <Text key={index}>{label.name}: {label.value}</Text>
      ))}
    </VStack>
    </SimpleGrid >
    </Box>


 </Box>
      </HStack>
    </Box>
  );
}

export default AlertDetails;
