import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import LoginForm from '../components/LoginForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  return <LoginForm navigation={navigation} />;
};

export default LoginScreen;
