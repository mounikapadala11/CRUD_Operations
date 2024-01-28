import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  VStack,
  FormControl,
  SimpleGrid,
  Input,
  NumberInputField,
  NumberInput,
  FormLabel,
} from '@chakra-ui/react';
import NavBar from './NavBar';
import Menu from './menu';
import { createAlertRule } from '../services/alertRules';

function AlertRuleCreate() {
  const navigate = useNavigate();

  const [alertRuleData, setAlertRuleData] = useState({

    name: '',
    description: "alert for server a latency. Alert if latency is greater than 1 second",
    expression: '',
    for: 0,
    interval: 0,
    labels: [{ name: 'account', value: 'test2' }],
    annotations: [{ name: 'account', value: 'test2' }]
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Use name attribute instead of id
    setAlertRuleData((prevState) => ({
      ...prevState,
      [name]: value,

    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAlertRule(alertRuleData);
      navigate('/');
      alert("Alert Rule Created Successfully")
    } catch (error) {
      console.error('Error creating alert rule:', error);
      alert("Alert Rule not successfull")
    }
  };

  return (
    <Box>
      <NavBar />
      <HStack spacing='30px' padding='10'>
        <Box w='25%' h='600' borderRadius='30' bg='lightBlue' padding='10'>
          <Menu />
        </Box>

        <Box w='75%' h='600' borderRadius='30' bg='lightBlue' padding='7'>
          <VStack spacing={4} align='stretch'>
            <Box fontSize={'20px'} fontWeight='bold'>
              Create Alert Rule
            </Box>
            <form onSubmit={handleSubmit}>
            <Box  spacing={'100'}>
              <FormControl id='alert-rule-name'>
                <FormLabel>Name</FormLabel>
                <Input
                  name='name' // Add name attribute
                  value={alertRuleData.name}
                  onChange={handleChange}
                  bg='white'
                />
              </FormControl>

              <FormControl id='alert-rule-expression'>
                <FormLabel mt={4}>Expression</FormLabel>
                <Input
                  name='expression' // Add name attribute
                  value={alertRuleData.expression}
                  onChange={handleChange}
                  bg='white'
                />
              </FormControl>

              <FormControl id='alert-rule-for'>
                <FormLabel mt={4}>Alert Rule "for" (nanoseconds)</FormLabel>
                <NumberInput
                  name='for' // Add name attribute
                  value={alertRuleData.for}
                  onChange={(_, value) =>
                    setAlertRuleData({ ...alertRuleData, for: value })
                  }
                  min={0}
                >
                  <NumberInputField bg='white' />
                </NumberInput>
              </FormControl>

              <FormControl id='alert-rule-interval'>
                <FormLabel mt={4}>Alert Rule “interval” (seconds)</FormLabel>
                <NumberInput
                  name='interval' // Add name attribute
                  value={alertRuleData.interval}
                  onChange={(_, value) =>
                    setAlertRuleData({ ...alertRuleData, interval: value })
                  }
                  min={0}
                >
                  <NumberInputField bg='white' />
                </NumberInput>
              </FormControl>

              <Button type='submit' colorScheme='blue' mt={6}>
                Submit
              </Button>
              </Box>

            </form>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}

export default AlertRuleCreate;

