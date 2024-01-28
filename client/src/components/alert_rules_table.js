import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlertRule } from './AlertRuleContext';
import { getAlertRules } from '../services/alertRules';
import { Table, Thead, Tbody, Tr, Th, Td, Box,Button,TableContainer, HStack } from '@chakra-ui/react';

function AlertRulesTable() {
  const [alertRules, setAlertRules] = useState([]);
  const { setAlertRule } = useAlertRule();
  const navigate = useNavigate();

  useEffect(() => {
    getAlertRules()
      .then(data => setAlertRules(data))
      .catch(error => console.error('Error fetching alert rules:', error));
  }, []);

  const handleEditClick = (rule) => {
    setAlertRule(rule);
    navigate('/editAlert');
  };
  const handleViewClickRule = (alert) => {
    setAlertRule(alert);
    navigate('/alertRuleDetails'); // navigate to alert details page
  };

  return (
    <Box>
    <TableContainer>
    <Table variant='simple' size='sm' bg="white" borderRadius={'15'}>
      <Thead bg="blue.400" color="white">
        <Tr>
          <Th color="white">Name</Th>
          <Th color="white">Expression</Th>
          <Th color="white">For (ns)</Th>
          <Th color="white">Interval (s)</Th>
          <Th color="white">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {alertRules.map((rule, index) => (
          <Tr key={index}>
            <Td w="5%" >{rule.name}</Td>
            <Td w="5%" >{rule.expression}</Td>
            <Td w="5%" >{rule.for}</Td>
            <Td w="5%" >{rule.interval}</Td>
            <Td w="5%" >
            <HStack>
              <Button colorScheme='blue' boxShadow="xl" onClick={() => handleEditClick(rule)}>
                Edit
              </Button>
              <Button colorScheme='blue' onClick={() => handleViewClickRule(rule)}>
                  View
                </Button>
                </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </TableContainer>
    </Box>
  );
}

export default AlertRulesTable;
