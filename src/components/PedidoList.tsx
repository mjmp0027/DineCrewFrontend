import React from 'react';
import {FlatList, TouchableOpacity, Text} from 'react-native';
import {Pedido} from '../types/Pedido';
import {PedidoListStyles as styles} from '../styles/PedidoListStyles';

type Props = {
  pedidos: Pedido[];
  onPressItem: (item: Pedido) => void;
};

const PedidoList: React.FC<Props> = ({pedidos, onPressItem}) => {
  const renderItem = ({item}: {item: Pedido}) => {
    let containerStyle;
    switch (item.estado) {
      case 'EN_PREPARACION':
        containerStyle = styles.pedidoContainerEnPreparacion;
        break;
      case 'LISTO':
        containerStyle = styles.pedidoContainerListo;
        break;
      case 'PENDIENTE':
      default:
        containerStyle = styles.pedidoContainerPendiente;
        break;
    }
    const isDisabled = item.estado === 'LISTO';

    return (
      <TouchableOpacity
        style={[styles.pedidoContainer, containerStyle]}
        onPress={() => onPressItem(item)}
        disabled={isDisabled}>
        <Text style={styles.pedidoText}>Mesa: {item.mesa}</Text>
        <Text style={styles.pedidoText}>Estado: {item.estado}</Text>
        <Text style={styles.pedidoText}>Items: {item.items.join(', ')}</Text>
        <Text style={styles.pedidoText}>
          Hora: {new Date(item.timestamp).toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={pedidos}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default PedidoList;
