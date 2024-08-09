import {useState, useEffect, useCallback} from 'react';
import fetchUserId from '../utils/fetchUserId';
import fetchMesas from '../utils/fetchMesas';
import {Mesa} from '../types/Mesa';

const useMesas = (
  token: string | null,
  decodedToken: any,
  isTokenLoaded: boolean,
) => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (isTokenLoaded && token && decodedToken) {
      const fetchUserData = async () => {
        const id = await fetchUserId(decodedToken.sub, token);
        if (id) {
          setUserId(id);
          const mesasData = await fetchMesas(token);
          setMesas(mesasData);
        }
      };

      fetchUserData();
    }
  }, [isTokenLoaded, token, decodedToken]);

  const addMesa = useCallback(async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/mesas', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok && token) {
        const mesasData = await fetchMesas(token);
        setMesas(mesasData);
      } else {
        console.error('Failed to add mesa');
      }
    } catch (error) {
      console.error('Error adding mesa:', error);
    }
  }, [token]);

  return {mesas, userId, addMesa};
};

export default useMesas;
