import {StyleSheet} from 'react-native';

export const MenuBarStyles = StyleSheet.create({
  menu: {
    height: 60,
    backgroundColor: '#6e0a0a',
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
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
});
