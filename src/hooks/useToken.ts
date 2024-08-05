import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decodeJwtToken from '../utils/decodeJwtToken';

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<any | null>(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          const decoded = decodeJwtToken(storedToken);
          setDecodedToken(decoded);
          setIsTokenLoaded(true);
        } else {
          console.log('Token not found');
        }
      } catch (error) {
        console.error('Error fetching or decoding token', error);
      }
    };

    fetchToken();
  }, []);

  return {token, decodedToken, isTokenLoaded};
};

export default useToken;
