import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {ItemListStyles as styles} from '../styles/ItemListStyles';

interface ItemListProps {
  items: string[];
  selectedItems: {[key: string]: number};
  onIncrementItem: (item: string) => void;
  onDecrementItem: (item: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  selectedItems,
  onIncrementItem,
  onDecrementItem,
}) => {
  return (
    <FlatList
      data={items}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item}</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => onDecrementItem(item)}
              style={styles.counterButton}>
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{selectedItems[item] || 0}</Text>
            <TouchableOpacity
              onPress={() => onIncrementItem(item)}
              style={styles.counterButton}>
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

export default ItemList;
