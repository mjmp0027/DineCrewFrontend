import {Dimensions, StyleSheet} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const adjustedHeight = (screenHeight * 0.94) / 5;

export const MesasScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContainer: {
    flexGrow: 1,
  },
  mesaBox: {
    width: '100%',
    height: adjustedHeight,
    justifyContent: 'flex-end',
    borderRadius: 0,
    overflow: 'hidden',
  },
  mesaImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  mesaText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
