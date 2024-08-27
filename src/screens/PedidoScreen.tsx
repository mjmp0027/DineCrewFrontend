import React, {useEffect, useState} from 'react';
import {View, Alert, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../hooks/useFetch';
import AccountModal from '../components/AccountModal';
import CategorySelector from '../components/CategorySelector';
import ItemList from '../components/ItemList';
import Footer from '../components/Footer';
import styles from '../styles/PedidoScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Pedido'>;

interface Product {
  category: string;
  name: string;
  price: number;
}

const PedidoScreen: React.FC<Props> = ({route, navigation}) => {
  const {mesa, items = [], editing = false, id} = route.params;
  const [category, setCategory] = useState('Bebida');
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number}>(
    {},
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [accountDetails, setAccountDetails] = useState<{
    items: {item: string; count: number; price: number}[];
    total: number;
  } | null>(null);
  const {fetchCsvData} = useFetch();

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchCsvData('http://10.0.2.2:8080/api/productos', setProducts);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (items && Array.isArray(items) && items.length > 0) {
      const initialItemsCount = items.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {} as {[key: string]: number});
      setSelectedItems(initialItemsCount);
    }
  }, [items]);

  const incrementItem = (item: string) => {
    setSelectedItems(prevItems => ({
      ...prevItems,
      [item]: (prevItems[item] || 0) + 1,
    }));
  };

  const decrementItem = (item: string) => {
    setSelectedItems(prevItems => ({
      ...prevItems,
      [item]: prevItems[item] > 1 ? prevItems[item] - 1 : 0,
    }));
  };

  const sendPedido = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const pedido = {
        mesa: mesa,
        items: Object.entries(selectedItems).flatMap(([item, count]) =>
          Array(count).fill(item),
        ),
      };

      const response = await fetch(
        `http://10.0.2.2:8080/api/pedidos${editing ? `/${id}` : ''}`,
        {
          method: editing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(pedido),
        },
      );

      if (response.ok) {
        Alert.alert('Pedido enviado', 'Tu pedido ha sido enviado con éxito.');
        navigation.goBack();
        if (editing) {
          navigation.goBack();
        }
      } else {
        const errordata = await response.text();
        Alert.alert('Error', errordata);
      }
    }
  };

  const calculateTotalAndItems = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await fetch(
        `http://10.0.2.2:8080/api/pedidos/${mesa}/LISTO`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        let total = 0;
        const cuentaItems: {item: string; count: number; price: number}[] = [];

        data.forEach((pedido: any) => {
          pedido.items.forEach((item: string) => {
            const product = products.find(p => p.name === item);
            if (product) {
              const itemIndex = cuentaItems.findIndex(
                cuentaItem => cuentaItem.item === item,
              );
              if (itemIndex > -1) {
                cuentaItems[itemIndex].count += 1;
              } else {
                cuentaItems.push({item: item, count: 1, price: product.price});
              }
              total += product.price;
            }
          });
        });
        setAccountDetails({items: cuentaItems, total});
        setModalVisible(true);
      } else {
        Alert.alert('Error', 'Hubo un problema al obtener la cuenta.');
      }
    }
  };

  const handleDeleteOrders = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      await fetch(`http://10.0.2.2:8080/api/pedidos/delete/${mesa}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalVisible(false);
      Alert.alert('Pedidos eliminados', 'Los pedidos han sido eliminados.');
    }
    if (accountDetails) {
      const cuentaDto = {
        items: accountDetails.items.map(item => `${item.count}x ${item.item}`),
        total: accountDetails.total,
      };

      const response = await fetch('http://10.0.2.2:8080/api/cuentas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cuentaDto),
      });

      if (response.ok) {
        Alert.alert('Cuenta guardada', 'La cuenta ha sido guardada con éxito.');
      } else {
        Alert.alert('Error', 'Hubo un problema al guardar la cuenta.');
      }
    }
  };

  const itemsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product.name);
    return acc;
  }, {} as {[key: string]: string[]});

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategorySelector
        categories={Object.keys(itemsByCategory)}
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
      <ItemList
        items={itemsByCategory[category]}
        selectedItems={selectedItems}
        onIncrementItem={incrementItem}
        onDecrementItem={decrementItem}
      />
      <Footer
        mesa={mesa}
        isEditing={editing}
        onSendPedido={sendPedido}
        onViewAccount={calculateTotalAndItems}
      />
      {accountDetails && (
        <AccountModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          accountDetails={accountDetails}
          onDelete={handleDeleteOrders}
        />
      )}
    </View>
  );
};

export default PedidoScreen;
