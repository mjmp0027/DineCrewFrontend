import {useState} from 'react';
import {useAuth} from '../AuthContext';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';

const useLogin = () => {
  const {login} = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://10.0.2.2:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    });
    const data = await response.json();
    if (response.ok) {
      await login(data.token);
      navigation.navigate('Home');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
  };
};

export default useLogin;
