import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, FlatList, Modal, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {HomeScreenStyles as styles} from '../styles/HomeScreenStyles';
import MenuBar from '../components/MenuBar';
import ContentBox from '../components/ContentBox';
import useUserRole from '../hooks/useUserRole';
import {useAuth} from '../AuthContext';
import decodeJwtToken from '../utils/decodeJwtToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {Notificacion} from '../types/Notificacion';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {logout} = useAuth();
  const role = useUserRole();
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<Notificacion[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

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
        await messaging().unsubscribeFromTopic(username);
      } else {
        Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
      }
    }
  };

  const subscribeToTopic = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJwtToken(token);
      const username = decodedToken.sub;
      try {
        await messaging().subscribeToTopic(username);
        console.log(`Subscribed to topic "${username}"`);
      } catch (error) {
        console.error('Error subscribing to topic:', error);
      }
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (token && userId) {
        const response = await fetch(
          `http://10.0.2.2:8080/api/notificaciones/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const data: Notificacion[] = await response.json();
          setNotifications(data);
          const unreadCount = data.filter(
            (n: any) => n.leida === 'NOLEIDA',
          ).length;
          setNotificationCount(unreadCount);
        }
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    subscribeToTopic();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      Alert.alert(
        remoteMessage.notification?.title as string,
        remoteMessage.notification?.body,
      );
      console.log('Pedido Listo', remoteMessage.notification?.body);
      setNotificationCount(prevCount => prevCount + 1);
    });

    return unsubscribe;
  }, []);

  const markNotificationsAsRead = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (token) {
        const unreadNotificationIds = notifications
          .filter((n: any) => n.leida === 'NOLEIDA')
          .map((n: any) => n.id);
        if (unreadNotificationIds.length > 0) {
          await fetch(`http://10.0.2.2:8080/api/notificaciones/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          setNotificationCount(0);
        }
      }
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const handleModalOpen = () => {
    setModalVisible(true);
    markNotificationsAsRead();
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [notificationCount]),
  );

  return (
    <View style={styles.container}>
      <MenuBar
        onNotificationsPress={handleModalOpen}
        onLogoutPress={handleLogout}
        notificationCount={notificationCount}
      />
      <View style={styles.content}>
        {role === 'CAMARERO' && (
          <>
            <ContentBox
              imageSource={require('../assets/mesas.jpg')}
              title="Mesas"
              onPress={() => navigation.navigate('Mesas')}
              style={styles.halfScreen}
            />
            <ContentBox
              imageSource={require('../assets/comandas.jpg')}
              title="Mis Comandas"
              onPress={() => navigation.navigate('Comandas')}
              style={styles.halfScreen}
            />
          </>
        )}
        {role === 'COCINERO' && (
          <ContentBox
            imageSource={require('../assets/comandas.jpg')}
            title="Comandas"
            onPress={() => navigation.navigate('Comandas')}
            style={styles.halfScreen}
          />
        )}
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notificaciones</Text>
            <FlatList
              data={notifications}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.notificationItem}>
                  <Text>{item.titulo}</Text>
                  <Text>{item.mensaje}</Text>
                  <Text>{item.items.join(', ')}</Text>
                  <Text>{new Date(item.timestamp).toLocaleString()}</Text>
                </View>
              )}
            />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
