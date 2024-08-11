import React from 'react';
import {FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {MesasScreenStyles as styles} from '../styles/MesasScreenStyles';
import {Mesa} from '../types/Mesa';

type MesaListProps = {
  mesas: Mesa[];
  userId: string;
  navigation: any;
};

const MesaList: React.FC<MesaListProps> = ({mesas, userId, navigation}) => {
  const renderItem = ({item}: {item: Mesa}) => {
    const isClickable = item.userId === userId;
    if (!isClickable) {
      return null;
    }

    const mesaImages = {
      1: require('../assets/mesa1.jpg'),
      2: require('../assets/mesa2.jpg'),
      3: require('../assets/mesa3.jpg'),
      4: require('../assets/mesa4.jpg'),
      5: require('../assets/mesa5.jpg'),
    };

    return (
      <TouchableOpacity
        style={[styles.mesaBox]}
        onPress={() =>
          navigation.navigate('Pedido', {
            mesa: item.numero,
            items: [],
            editing: false,
            id: '',
          })
        }>
        <Image source={mesaImages[item.numero]} style={styles.mesaImage} />
        <Text style={styles.mesaText}>{`Mesa ${item.numero}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={mesas}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      numColumns={1}
      scrollEnabled={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default MesaList;
