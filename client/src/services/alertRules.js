// import axios from 'axios';

// // Create an Alert Rule
// export const createAlertRule = async (alertRuleData) => {
//   try {
//     const response = await axios.post('http://localhost:8080/alert-rule', alertRuleData, {
//       headers: {
//         'accept': 'application/json',
//         'Content-Type': 'application/json', 
//         'Access-Control-Allow-Origin':'*'
//       },
//     });
//     alert(response.data)
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // Retrieve all Alert Rules
// export const getAlertRules = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/alert-rules', {
//       headers: {
//         'accept': 'application/json',
//       },
//     });
//     alert(response.data)
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // Update an Alert Rule by ID
// export const getAlertRule = async (alertRuleId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/alert-rule/${alertRuleId}`, {
//         headers: {
//           'accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

// // Update an Alert Rule by ID
// export const updateAlertRule = async (alertRuleId, alertRuleData) => {
//   try {
//     const response = await axios.put(`http://localhost:8080/alert-rule/${alertRuleId}`, alertRuleData, {
//       headers: {
//         'accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

import axios from 'axios';

// Use the environment variable for the API URL or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Create an Alert Rule
export const createAlertRule = async (alertRuleData) => {
  try {
    const response = await axios.post(`${API_URL}/alert-rule`, alertRuleData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    // Return the response data to be handled by the caller function
    return response.data;
  } catch (error) {
    // Log the error and throw an exception with the error message
    console.error('Error creating alert rule:', error);
    throw new Error(error.response.data || 'Error creating alert rule');
  }
};

// Retrieve all Alert Rules
export const getAlertRules = async () => {
  try {
    const response = await axios.get(`${API_URL}/alert-rules`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching alert rules:', error);
    throw new Error(error.response.data || 'Error fetching alert rules');
  }
};

// Fetch an Alert Rule by ID
export const getAlertRule = async (alertRuleId) => {
  try {
    const response = await axios.get(`${API_URL}/alert-rule/${alertRuleId}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching alert rule:', error);
    throw new Error(error.response.data || 'Error fetching alert rule');
  }
};

// Update an Alert Rule by ID
export const updateAlertRule = async (alertRuleId, alertRuleData) => {
  try {
    const response = await axios.put(`${API_URL}/alert-rule/${alertRuleId}`, alertRuleData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating alert rule:', error);
    throw new Error(error.response.data || 'Error updating alert rule');
  }
};
