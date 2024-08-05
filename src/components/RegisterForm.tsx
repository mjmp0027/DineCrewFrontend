import React from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import useRegister from '../hooks/useRegister';
import styles from '../styles/RegisterScreenStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const RegisterForm: React.FC<Props> = ({navigation}) => {
  const {
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
    numMesas,
    setNumMesas,
    modalVisible,
    handleRegister,
    handleInitializeMesas,
  } = useRegister();

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

export default RegisterForm;
