import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {MesasScreenStyles as styles} from '../styles/MesasScreenStyles';
import MesaList from '../components/MesaList';
import useToken from '../hooks/useToken';
import useMesas from '../hooks/useMesas';

type Props = NativeStackScreenProps<RootStackParamList, 'Mesas'>;

const MesasScreen: React.FC<Props> = ({navigation}) => {
  const {token, decodedToken, isTokenLoaded} = useToken();
  const {mesas, userId, addMesa} = useMesas(token, decodedToken, isTokenLoaded);

  return (
    <View style={styles.container}>
      <MesaList mesas={mesas} userId={userId} navigation={navigation} />
      <TouchableOpacity onPress={addMesa} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MesasScreen;
