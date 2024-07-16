import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';

const ForgotPasswordScreen: React.FC = () => {
  const [username, setUsername] = useState('');

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    width: '80%',
    padding: 10,
  },
});

export default ForgotPasswordScreen;
