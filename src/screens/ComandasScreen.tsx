import React from 'react';
import {View, Alert, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {ComandasScreenStyles as styles} from '../styles/ComandasScreenStyles';
import PedidoList from '../components/PedidoList';
import usePedidos from '../hooks/usePedidos';
import useUserRole from '../hooks/useUserRole';
import updatePedidoEstado from '../utils/updatePedidoEstado';
import {Pedido} from '../types/Pedido';

type Props = NativeStackScreenProps<RootStackParamList, 'Comandas'>;

const ComandasScreen: React.FC<Props> = ({navigation}) => {
  const {pedidos, fetchPedidos} = usePedidos();
  const role = useUserRole();

  const handleOrderPress = async (item: Pedido) => {
    if (item.estado === 'LISTO') {
      return;
    }

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
              const success = await updatePedidoEstado(item.id, nextState);
              if (success) {
                fetchPedidos();
                Alert.alert('Éxito', 'El pedido ha sido actualizado.');
              } else {
                Alert.alert('Error', 'No se pudo actualizar el pedido.');
              }
            },
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      {pedidos.length === 0 ? (
        <View style={styles.noPedidosContainer}>
          <Text style={styles.noPedidosText}>
            No tienes pedidos actualmente.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Mesas')}>
            <Text style={styles.buttonText}>Ir a Mesas</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <PedidoList pedidos={pedidos} onPressItem={handleOrderPress} />
      )}
    </View>
  );
};

export default ComandasScreen;
