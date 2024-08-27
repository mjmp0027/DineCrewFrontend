import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
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
  const [selectedCategory, setSelectedCategory] = useState<
    'PENDIENTE' | 'EN_PREPARACION' | 'LISTO'
  >('PENDIENTE');

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

  const filteredPedidos = pedidos.filter(
    pedido => pedido.estado === selectedCategory,
  );

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <View style={styles.container}>
      {pedidos.length > 0 && (
        <View style={styles.menuContainer}>
          {['PENDIENTE', 'EN_PREPARACION', 'LISTO'].map(category => (
            <TouchableOpacity
              key={category}
              onPress={() =>
                setSelectedCategory(
                  category as 'PENDIENTE' | 'EN_PREPARACION' | 'LISTO',
                )
              }
              style={[
                styles.menuButton,
                selectedCategory === category && styles.menuButtonActive,
              ]}>
              <Text
                style={[
                  styles.menuButtonText,
                  selectedCategory === category && styles.activeMenuText,
                ]}>
                {capitalizeFirstLetter(category.replace('_', ' '))}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {filteredPedidos.length === 0 ? (
        <View style={styles.noPedidosContainer}>
          <Text style={styles.noPedidosText}>
            No tienes pedidos{' '}
            {capitalizeFirstLetter(selectedCategory.toLowerCase())}s
            actualmente.
          </Text>
        </View>
      ) : (
        <PedidoList
          pedidos={filteredPedidos}
          onPressItem={handleOrderPress}
          selectedCategory={selectedCategory}
        />
      )}
    </View>
  );
};

export default ComandasScreen;
