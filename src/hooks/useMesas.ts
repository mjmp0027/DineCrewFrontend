import {useState, useEffect} from 'react';
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
  return {mesas, userId};
};

export default useMesas;
