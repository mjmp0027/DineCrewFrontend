import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {Pedido} from '../interfaces/Pedido';
import decodeJwtToken from '../decodeJwtToken';

type Props = NativeStackScreenProps<RootStackParamList, 'Comandas'>;

const ComandasScreen: React.FC<Props> = ({navigation}) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [role, setRole] = useState<string | null>(null);

  const fetchUserRole = async () => {
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

  const fetchPedidos = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('http://10.0.2.2:8080/api/pedidos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        // Ordenar los pedidos por fecha y mesa
        data.sort((a: Pedido, b: Pedido) => {
          const dateComparison =
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          if (dateComparison !== 0) {
            return dateComparison;
          } else {
            return b.mesa.localeCompare(a.mesa);
          }
        });

        setPedidos(data);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al obtener los pedidos.');
    }
  };

  useEffect(() => {
    fetchUserRole();
    fetchPedidos();
  }, []);

  const handleOrderPress = async (item: Pedido) => {
    if (role === 'CAMARERO') {
      navigation.navigate('Pedido', {
        mesa: item.mesa,
        items: item.items,
        editing: true,
        id: item.id,
      });
    } else if (role === 'COCINERO') {
      const nextState =
        item.estado === 'PENDIENTE' ? 'EN_PREPARACION' : 'LISTO';
      Alert.alert(
        'Actualizar Pedido',
        `¿Quieres pasar este pedido a '${nextState.replace('_', ' ')}'?`,
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Sí',
            onPress: async () => {
              try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                  const response = await fetch(
                    `http://10.0.2.2:8080/api/pedidos/${item.id}/estado`,
                    {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(nextState),
                    },
                  );

                  if (response.ok) {
                    fetchPedidos();
                    Alert.alert('Éxito', 'El pedido ha sido actualizado.');
                  } else {
                    Alert.alert('Error', 'No se pudo actualizar el pedido.');
                  }
                }
              } catch (error) {
                Alert.alert(
                  'Error',
                  'Hubo un problema al actualizar el pedido.',
                );
              }
            },
          },
        ],
      );
    }
  };

  const renderItem = ({item}: {item: Pedido}) => (
    <TouchableOpacity
      style={styles.pedidoContainer}
      onPress={() => handleOrderPress(item)}>
      <Text style={styles.pedidoText}>Mesa: {item.mesa}</Text>
      <Text style={styles.pedidoText}>Estado: {item.estado}</Text>
      <Text style={styles.pedidoText}>Items: {item.items.join(', ')}</Text>
      <Text style={styles.pedidoText}>
        Hora: {new Date(item.timestamp).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pedidoContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
  },
  pedidoText: {
    fontSize: 16,
  },
});

export default ComandasScreen;
