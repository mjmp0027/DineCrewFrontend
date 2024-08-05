import {StyleSheet} from 'react-native';

export const MenuBarStyles = StyleSheet.create({
  menu: {
    height: 60,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menuText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
    color: 'white',
  },
});
