export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  Mesas: undefined;
  Comandas: undefined;
  Pedido: {mesa: string; items: string[]; editing: boolean; id: string};
};
