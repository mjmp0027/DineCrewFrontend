import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decodeJwtToken from '../decodeJwtToken';
import {useAuth} from '../AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {logout} = useAuth();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decodedToken = decodeJwtToken(token);
        const username = decodedToken.sub;

        const response = await fetch(
          `http://10.0.2.2:8080/api/users/${username}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const userData = await response.json();
          setRole(userData.role);
        } else {
          Alert.alert('Error', 'No se pudo obtener el rol del usuario.');
        }
      }
    };

    getUserRole();
  }, []);
  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJwtToken(token);
      const username = decodedToken.sub;
      const response = await fetch(
        `http://10.0.2.2:8080/api/auth/logout/${username}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        await logout();
        Alert.alert('Cerrar sesión', 'Has cerrado sesión con éxito.');
      } else {
        Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text style={styles.menuText}>Menú</Text>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Notificaciones', 'No tienes notificaciones nuevas.')
            }>
            <Icon name="notifications-outline" size={25} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="person-circle-outline" size={25} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        {role === 'CAMARERO' && (
          <>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate('Mesas')}>
              <Text style={styles.boxText}>Mesas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate('Comandas')}>
              <Text style={styles.boxText}>Mis Comandas</Text>
            </TouchableOpacity>
          </>
        )}
        {role === 'COCINERO' && (
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('Comandas')}>
            <Text style={styles.boxText}>Comandas</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  menu: {
    height: 60,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menuText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
