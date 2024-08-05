import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPedidos from '../utils/fetchPedidos';
import {Pedido} from '../types/Pedido';

const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const fetchPedidosData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const fetchedPedidos = await fetchPedidos(token);
      setPedidos(fetchedPedidos);
    }
  };

  useEffect(() => {
    fetchPedidosData();
  }, []);

  return {pedidos, fetchPedidos: fetchPedidosData};
};

export default usePedidos;
