import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CategorySelectorStyles as styles} from '../styles/CategorySelectorStyles';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.header}>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelectCategory(cat)}
          style={[
            styles.headerButton,
            selectedCategory === cat && styles.activeButton,
          ]}>
          <Text style={styles.headerText}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategorySelector;
