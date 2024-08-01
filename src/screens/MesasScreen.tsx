import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Mesa} from '../interfaces/Mesa';
import decodeJwtToken from '../decodeJwtToken';
import {RootStackParamList} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Mesas'>;

const MesasScreen: React.FC<Props> = ({navigation}) => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [stringToken, setStringToken] = useState<string | null>(null);
  const [token, setToken] = useState<any | null>(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false);

  const fetchUserId = async () => {
    const username = token ? token.sub : null;
    if (username) {
      try {
        const response = await fetch(
          `http://10.0.2.2:8080/api/users/${username}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${stringToken}`,
            },
          },
        );
        const data = await response.json();
        setUserId(data.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchMesas = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/mesas', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${stringToken}`,
        },
      });
      const data = await response.json();
      setMesas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setStringToken(storedToken);
        const decoded = decodeJwtToken(storedToken);
        setToken(decoded);
        setIsTokenLoaded(true);
      } else {
        console.log('Token not found');
        setToken(null);
      }
    } catch (error) {
      console.error('Error fetching or decoding token', error);
      setToken(null);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (isTokenLoaded) {
      fetchUserId();
      fetchMesas();
    }
  }, [isTokenLoaded]);

  return (
    <View style={styles.container}>
      {mesas.map(mesa => {
        const isClickable = mesa.userId === userId; // Determine if the mesa is clickable
        const mesaStyle = isClickable
          ? styles.mesaAsignada
          : styles.mesaNoAsignada;

        return (
          <TouchableOpacity
            key={mesa.id}
            style={[styles.mesa, mesaStyle]}
            onPress={() => {
              if (isClickable) {
                navigation.navigate('Pedido', {
                  mesa: mesa.numero,
                  items: [],
                  editing: false,
                  id: '',
                });
              }
            }}
            disabled={!isClickable}>
            <Text style={styles.mesaText}>{`Mesa ${mesa.numero}`}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  mesa: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  mesaAsignada: {
    backgroundColor: 'lightgreen',
  },
  mesaNoAsignada: {
    backgroundColor: 'lightgray',
  },
  mesaText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default MesasScreen;
