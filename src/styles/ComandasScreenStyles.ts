import {StyleSheet} from 'react-native';

export const ComandasScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#6e0a0a',
  },
  menuButton: {
    padding: 10,
    alignItems: 'center',
  },
  menuButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activeMenuText: {
    // Optional: if you want to add special styling to the active text
  },
  menuButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  noPedidosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPedidosText: {
    fontSize: 18,
    color: '#333',
  },
});
