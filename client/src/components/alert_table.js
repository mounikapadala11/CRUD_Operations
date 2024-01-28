import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from './AlertContext'; // import the context
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';

function AlertTable({ alerts }) {
  const navigate = useNavigate();
  const { setCurrentAlert } = useAlert();

  const handleViewClick = (alert) => {
    setCurrentAlert(alert);
    navigate('/alertDetails'); // navigate to alert details page
  };

  return (
    <TableContainer>
      <Table variant='simple' bg="white" borderRadius='10'>
        <Thead bg="blue.400" color="white">
          <Tr>
            <Th color="white">Name</Th>
            <Th color="white">Alert Rule UUID</Th>
            <Th color="white">Status</Th>
            <Th color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {alerts.map((alert, index) => (
            <Tr key={index}>
              <Td>{alert.name}</Td>
              <Td>{alert.alertRuleUUID}</Td>
              <Td>{alert.status}</Td>
              <Td>
                <Button colorScheme='blue' onClick={() => handleViewClick(alert)}>
                  View Alert
                </Button>
                
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default AlertTable;

