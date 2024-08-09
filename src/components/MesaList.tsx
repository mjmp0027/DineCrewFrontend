import React from 'react';
import {FlatList} from 'react-native';
import MesaItem from './MesaItem';
import {Mesa} from '../types/Mesa';
import {MesasScreenStyles as styles} from '../styles/MesasScreenStyles';

type MesaListProps = {
  mesas: Mesa[];
  userId: string;
  navigation: any;
};

const MesaList: React.FC<MesaListProps> = ({mesas, userId, navigation}) => {
  const renderItem = ({item}: {item: Mesa}) => {
    const isClickable = item.userId === userId;
    return (
      <MesaItem
        mesa={item}
        isClickable={isClickable}
        onPress={() => {
          if (isClickable) {
            navigation.navigate('Pedido', {
              mesa: item.numero,
              items: [],
              editing: false,
              id: '',
            });
          }
        }}
      />
    );
  };

  return (
    <FlatList
      data={mesas}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      numColumns={3}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default MesaList;
