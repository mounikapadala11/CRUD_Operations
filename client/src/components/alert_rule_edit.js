import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlertRule } from './AlertRuleContext';
import { updateAlertRule } from '../services/alertRules';
import { Box, Button, FormControl, FormLabel, Input, HStack, NumberInput, NumberInputField, VStack } from '@chakra-ui/react';
import NavBar from './NavBar';
import Menu from './menu';

function AlertRuleEdit() {
  const navigate = useNavigate();
  const { currentAlertRule } = useAlertRule();
  const [alertRuleData, setAlertRuleData] = useState({ ...currentAlertRule });

  useEffect(() => {
    if (currentAlertRule) {
      setAlertRuleData(currentAlertRule);
    }
  }, [currentAlertRule]);

  if (!currentAlertRule) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlertRuleData({ ...alertRuleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Convert `for` and `interval` fields to integers
        const updatedData = {
            ...alertRuleData,
            for: parseInt(alertRuleData.for, 10), // base 10
            interval: parseInt(alertRuleData.interval, 10) // base 10
        };

        await updateAlertRule(currentAlertRule.id, updatedData);
        navigate('/');
        alert("Edited Alert Rule Successfully") // Navigate back to the list
    } catch (error) {
        console.error('Error updating alert rule:', error);
        alert("Edit Unsuccessful")
    }
};

  return (
    <Box>
      <NavBar />
      <HStack spacing='30px' padding='10'>
        <Box w='25%' h='600px' borderRadius='30' bg='lightBlue' padding="10">
          <Menu />
        </Box>

        <Box w='75%' h='600px' borderRadius='30' bg='lightBlue' padding='7'>
          <VStack spacing={4} align="stretch">
            <Box fontSize={'20px'} fontWeight='bold'>
              Edit Alert Rule
            </Box>
            <form onSubmit={handleSubmit} padding="10" >
              <FormControl id='name'>
                <FormLabel mt={4}>Name</FormLabel>
                <Input name='name' value={alertRuleData.name} bg='white' onChange={handleChange} />
              </FormControl>
              <FormControl id='expression'>
                <FormLabel mt={4}>Expression</FormLabel>
                <Input name='expression' value={alertRuleData.expression} bg='white' onChange={handleChange} />
              </FormControl>
              <FormControl id='for'>
                <FormLabel mt={4} >For (nanoseconds)</FormLabel>
                <NumberInput value={alertRuleData.for} min={0}>
                  <NumberInputField name='for' bg='white' onChange={handleChange} />
                </NumberInput>
              </FormControl>
              <FormControl id='interval'>
                <FormLabel  mt={4}>Interval (seconds)</FormLabel>
                <NumberInput value={alertRuleData.interval} min={0}>
                  <NumberInputField name='interval' bg='white' onChange={handleChange} />
                </NumberInput>
              </FormControl>
              <Button type='submit' colorScheme='blue' mt= {'6'}>Update</Button>
            </form>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}

export default AlertRuleEdit;
