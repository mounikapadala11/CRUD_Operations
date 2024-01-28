// pages/home
import React from 'react';
import NavBar from '../components/NavBar';
import Skeleton from '../components/skeleton';
import List_alerts from '../components/list_alerts';
import {Box} from '@chakra-ui/react';
import CreateAlert from '../components/alert_rule_create';
import EditAlert from '../components/alert_rule_edit';


function home() {
  return (
<Box>

<Skeleton/>
</Box>

 
  );
}

export default home;
