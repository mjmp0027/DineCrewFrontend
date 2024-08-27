import {useState} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {Alert} from 'react-native';

const useRegister = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('Selecciona un rol');
  const [message, setMessage] = useState<string>('');
  const [numMesas, setNumMesas] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleRegister = async () => {
    const response = await fetch('http://10.0.2.2:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, password, confirmPassword, role}),
    });

    if (response.ok) {
      const data = await response.json();
      const message = data.message;

      setMessage(message);
      if (message === 'Primer usuario registrado') {
        setModalVisible(true);
      }
      Alert.alert('Registro', 'Usuario registrado correctamente');
      if (message !== 'Primer usuario registrado') {
        navigation.navigate('Login');
      }
    } else {
      const errorData = await response.json();
      setMessage(errorData.message || 'Error durante el registro');
    }
  };

  const handleInitializeMesas = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8080/api/mesas/${numMesas}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Mesas inicializadas correctamente');
        setModalVisible(false);
        navigation.navigate('Login');
      } else {
        setMessage(data.message || 'Error al inicializar mesas');
      }
    } catch (error) {
      console.error('Error during mesa initialization:', error);
      setMessage('Error al inicializar mesas');
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    role,
    setRole,
    message,
    setMessage,
    numMesas,
    setNumMesas,
    modalVisible,
    setModalVisible,
    handleRegister,
    handleInitializeMesas,
  };
};

export default useRegister;
