import {StyleSheet} from 'react-native';

export const ContentBoxStyles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  boxText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});
