import React from 'react';
import {View, Text, Button} from 'react-native';
import {FooterStyles as styles} from '../styles/FooterStyles';

interface FooterProps {
  mesa: string;
  isEditing: boolean;
  onSendPedido: () => void;
  onViewAccount: () => void;
}

const Footer: React.FC<FooterProps> = ({
  mesa,
  isEditing,
  onSendPedido,
  onViewAccount,
}) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.mesaText}>Mesa: {mesa}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={isEditing ? 'Actualizar Pedido' : 'Enviar Pedido'}
          onPress={onSendPedido}
        />
        <Button title="Ver Cuenta" onPress={onViewAccount} />
      </View>
    </View>
  );
};

export default Footer;
