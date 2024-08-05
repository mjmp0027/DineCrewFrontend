import AsyncStorage from '@react-native-async-storage/async-storage';

const updatePedidoEstado = async (
  pedidoId: string,
  nextState: string,
): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await fetch(
        `http://10.0.2.2:8080/api/pedidos/${pedidoId}/estado`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nextState),
        },
      );

      return response.ok;
    }
  } catch (error) {
    console.error('Error al actualizar el estado del pedido:', error);
  }

  return false;
};

export default updatePedidoEstado;
