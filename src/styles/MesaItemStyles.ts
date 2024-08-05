import {StyleSheet} from 'react-native';

export const MesaItemStyles = StyleSheet.create({
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
