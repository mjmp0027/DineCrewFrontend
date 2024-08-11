import React from 'react';
import {Button, FlatList, Modal, Text, View} from 'react-native';
import {styles} from '../styles/AccountModalStyles';

interface AccountModalProps {
  visible: boolean;
  onClose: () => void;
  accountDetails: {
    items: {item: string; count: number; price: number}[];
    total: number;
  };
  onDelete: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({
  visible,
  onClose,
  accountDetails,
  onDelete,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cuenta</Text>
          <FlatList
            data={accountDetails.items}
            keyExtractor={item => item.item}
            renderItem={({item}) => (
              <View style={styles.itemRow}>
                <Text>
                  {item.item} (x{item.count})
                </Text>
                <Text>${item.price.toFixed(2)}</Text>
              </View>
            )}
          />
          <Text style={styles.totalText}>
            Total: ${accountDetails.total.toFixed(2)}
          </Text>
          <Text style={styles.confirmText}>¿Desea eliminar estos pedidos?</Text>
          <Button title="Eliminar Pedidos" onPress={onDelete} />
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default AccountModal;
