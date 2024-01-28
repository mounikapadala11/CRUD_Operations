// export default AlertRuleDetails;
import React, { useEffect, useState } from 'react';
import { useAlertRule} from './AlertRuleContext';
import { getAlertRule } from '../services/alertRules';
import { Box, Text, VStack, HStack, Spacer, SimpleGrid } from '@chakra-ui/react';
import NavBar from './NavBar';
import Menu from './menu';

function AlertRuleDetails() {
  const { currentAlertRule } = useAlertRule();
  const [alertDetails, setAlertDetails] = useState(null);

  useEffect(() => {
    if (currentAlertRule && currentAlertRule.id) {
      getAlertRule(currentAlertRule.id)
        .then(data => setAlertDetails(data))
        .catch(error => console.error('Error fetching alert details:', error));
    }
  }, [currentAlertRule]);

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
            <Text fontSize="2xl" fontWeight="bold">Alert Rule Details</Text>
          </Box>
          <Box padding='2' w='50%' > 
          <SimpleGrid columns={2} spacingX='10px' padding='2'>
            {/* Left Column */}

            <VStack align= "start">
              <Text><strong>Name:</strong></Text>
              <Text><strong>Status:</strong></Text>
              <Text><strong>Description:</strong></Text>
              <Text><strong>Expression:</strong></Text>
              <Text><strong>For (ns):</strong></Text>
              <Text><strong>Interval (s):</strong></Text>
              <Text><strong>Starts At:</strong></Text>
              <Text><strong>Ends At:</strong></Text>
              <Text><strong>Last Updated:</strong></Text>
              <Text><strong>Annotations:</strong></Text>
              <Text><strong>Labels:</strong></Text>
            </VStack>

            {/* Right Column */}
            <VStack align= "start">
              <Text>{alertDetails.name}</Text>
              <Text>{alertDetails.status}</Text>
              <Text overflowX='visible' whiteSpace='nowrap'>{alertDetails.description}</Text>
              <Text overflowX='visible' whiteSpace='nowrap'>{alertDetails.expression}</Text>
              <Text>{alertDetails.for}</Text>
              <Text>{alertDetails.interval}</Text>
              <Text>{new Date(alertDetails.startsAt).toLocaleString()}</Text>
              <Text>{new Date(alertDetails.endsAt).toLocaleString()}</Text>
              <Text>{new Date(alertDetails.updatedAt).toLocaleString()}</Text>
              {alertDetails.annotations.map((annotation, index) => (
                <Text key={index}>{annotation.name}: {annotation.value}</Text>
              ))}
              {alertDetails.labels.map((label, index) => (
                <Text key={index}>{label.name}: {label.value}</Text>
              ))}
            </VStack>
          </SimpleGrid>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
}

export default AlertRuleDetails;
