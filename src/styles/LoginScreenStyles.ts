import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  registerLink: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default styles;
