import {StyleSheet} from 'react-native';

export const CategorySelectorStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#6200EE',
  },
  headerButton: {
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
});
