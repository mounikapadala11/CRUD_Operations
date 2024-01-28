
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Retrieve all Alerts
export const getAlerts = async () => {
  try {
    const response = await axios.get(`${API_URL}/alerts`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving alerts:', error);
    throw new Error(error.response.data || 'Error retrieving alerts');
  }
};

// Retrieve an Alert by ID
export const getAlertById = async (alertId) => {
  try {
    const response = await axios.get(`${API_URL}/alert/${alertId}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving alert by ID:', error);
    throw new Error(error.response.data || 'Error retrieving alert by ID');
  }
};

// import axios from 'axios';

// // Retrieve all Alerts
// export const getAlerts = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/alerts', {
//       headers: {
//         'accept': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // Retrieve an Alert by ID
// export const getAlertById = async (alertId) => {
//   try {
//     const response = await axios.get(`http://localhost:8080/alert/${alertId}`, {
//       headers: {
//         'accept': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
