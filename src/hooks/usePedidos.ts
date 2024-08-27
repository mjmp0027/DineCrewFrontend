import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPedidos from '../utils/fetchPedidos';
import {Pedido} from '../types/Pedido';
import useUserRole from '../hooks/useUserRole';

const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const role = useUserRole();

  const fetchPedidosData = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    if (token && role) {
      const fetchedPedidos = await fetchPedidos(token, userId, role);
      setPedidos(fetchedPedidos);
    }
  };

  useEffect(() => {
    fetchPedidosData();
  }, [role]);

  return {pedidos, fetchPedidos: fetchPedidosData};
};

export default usePedidos;
