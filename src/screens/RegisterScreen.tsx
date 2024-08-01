import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({navigation}) => {
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
      body: JSON.stringify({username, email, password, role}), // Include role in the request body
    });

    if (response.ok) {
      const data = await response.json();
      const message = data.message;

      setMessage(message);
      if (message === 'Primer usuario registrado') {
        setModalVisible(true);
      }
      Alert.alert('Registro', 'Usuario registrado correctamente');
      navigation.replace('Login');
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Nombre de Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Picker
        selectedValue={role}
        onValueChange={itemValue => setRole(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Selecciona un rol" value="Selecciona un rol" />
        <Picker.Item label="Camarero" value="CAMARERO" />
        <Picker.Item label="Cocinero" value="COCINERO" />
      </Picker>
      <Button title="Registrar" onPress={handleRegister} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>
          ¿Ya tienes una cuenta? Inicia Sesión
        </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Inicializar Mesas</Text>
            <TextInput
              placeholder="Número de mesas"
              value={numMesas}
              onChangeText={setNumMesas}
              style={styles.input}
              keyboardType="numeric"
            />
            <Button title="Inicializar" onPress={handleInitializeMesas} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    color: 'red',
  },
  loginLink: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
});

export default RegisterScreen;
