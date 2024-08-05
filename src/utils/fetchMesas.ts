import {Mesa} from '../types/Mesa';

const fetchMesas = async (token: string): Promise<Mesa[]> => {
  try {
    const response = await fetch('http://10.0.2.2:8080/api/mesas', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Failed to fetch mesas');
      return [];
    }
  } catch (error) {
    console.error('Error fetching mesas:', error);
    return [];
  }
};

export default fetchMesas;
