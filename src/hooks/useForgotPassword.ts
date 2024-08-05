import {useState} from 'react';
import {Alert} from 'react-native';

const useForgotPassword = () => {
  const [username, setUsername] = useState<string>('');

  const handleForgotPassword = async () => {
    const response = await fetch(
      'http://10.0.2.2:8080/api/auth/forgot-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username}),
      },
    );

    const result = await response.json();

    if (response.ok) {
      Alert.alert('Success', 'Email sent');
    } else {
      Alert.alert('Error', result.message);
    }
  };

  return {
    username,
    setUsername,
    handleForgotPassword,
  };
};

export default useForgotPassword;
