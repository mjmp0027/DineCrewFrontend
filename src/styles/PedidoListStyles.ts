import {StyleSheet} from 'react-native';

export const PedidoListStyles = StyleSheet.create({
  pedidoContainer: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
  },
  pedidoContainerEnPreparacion: {
    backgroundColor: '#BBDEFB',
  },
  pedidoContainerListo: {
    backgroundColor: '#C8E6C9',
  },
  pedidoContainerPendiente: {
    backgroundColor: '#E0E0E0',
  },
  pedidoText: {
    fontSize: 16,
    color: '#000',
  },
});
