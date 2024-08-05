import React from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import useLogin from '../hooks/useLogin';
import styles from '../styles/LoginScreenStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LoginForm: React.FC<Props> = ({navigation}) => {
  const {username, setUsername, password, setPassword, error, handleLogin} =
    useLogin();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>He olvidado mi contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>
          ¿No tienes una cuenta? Regístrate
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
