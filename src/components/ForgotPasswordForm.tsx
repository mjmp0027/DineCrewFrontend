import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import useForgotPassword from '../hooks/useForgotPassword';
import styles from '../styles/ForgotPasswordScreenStyles';

const ForgotPasswordForm: React.FC = () => {
  const {username, setUsername, handleForgotPassword} = useForgotPassword();

  return (
    <View style={styles.container}>
      <Text>Introduce tu nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Enviar" onPress={handleForgotPassword} />
    </View>
  );
};

export default ForgotPasswordForm;
