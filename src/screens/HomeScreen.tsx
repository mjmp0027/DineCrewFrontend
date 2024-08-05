import React from 'react';
import {Alert, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {HomeScreenStyles as styles} from '../styles/HomeScreenStyles';
import MenuBar from '../components/MenuBar';
import ContentBox from '../components/ContentBox';
import useUserRole from '../hooks/useUserRole';
import {useAuth} from '../AuthContext';
import decodeJwtToken from '../utils/decodeJwtToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {logout} = useAuth();
  const role = useUserRole();

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
      <MenuBar
        onNotificationsPress={() =>
          Alert.alert('Notificaciones', 'No tienes notificaciones nuevas.')
        }
        onLogoutPress={handleLogout}
      />
      <View style={styles.content}>
        {role === 'CAMARERO' && (
          <>
            <ContentBox
              title="Mesas"
              onPress={() => navigation.navigate('Mesas')}
            />
            <ContentBox
              title="Mis Comandas"
              onPress={() => navigation.navigate('Comandas')}
            />
          </>
        )}
        {role === 'COCINERO' && (
          <ContentBox
            title="Comandas"
            onPress={() => navigation.navigate('Comandas')}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
