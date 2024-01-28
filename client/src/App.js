import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CreateAlert from './components/alert_rule_create';
import EditAlert from './components/alert_rule_edit';
import ListAlerts from './components/list_alerts';
import AlertDetails from './components/alertDetails';
import AlertRuleDetails from './components/alertRuleDetails';
import { AlertRuleProvider } from './components/AlertRuleContext';
import { AlertProvider } from './components/AlertContext';

function App() {
  return (
    <ChakraProvider>
      <AlertRuleProvider>
      <AlertProvider>
      <Router basename='/'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createAlert" element={<CreateAlert />} /> 
          <Route path="/editAlert" element={<EditAlert />} />
          <Route path="/listAlerts" element={<ListAlerts />} /> 
          <Route path='/alertDetails' element={<AlertDetails />} />
          <Route path='/alertRuleDetails' element={<AlertRuleDetails />} />
        </Routes>
      </Router>
     </AlertProvider>
      </AlertRuleProvider>
    </ChakraProvider>
  );
}

export default App;
