import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import {RootStackParamList} from './src/types';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MesasScreen from './src/screens/MesasScreen';

import {decode as atob} from 'base-64';
import ComandasScreen from './src/screens/ComandasScreen';
import PedidoScreen from './src/screens/PedidoScreen';
import {AuthProvider, useAuth} from './src/AuthContext';
import LoadingScreen from './src/LoadingScreen';
global.atob = atob;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Mesas" component={MesasScreen} />
          <Stack.Screen name="Comandas" component={ComandasScreen} />
          <Stack.Screen name="Pedido" component={PedidoScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
