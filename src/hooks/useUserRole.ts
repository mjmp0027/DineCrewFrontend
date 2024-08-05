import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decodeJwtToken from '../utils/decodeJwtToken';
import fetchUserRole from '../utils/fetchUserRole';

const useUserRole = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decodedToken = decodeJwtToken(token);
        const userRole = await fetchUserRole(decodedToken.sub, token);
        if (userRole) {
          setRole(userRole);
        }
      }
    };

    getUserRole();
  }, []);

  return role;
};

export default useUserRole;
