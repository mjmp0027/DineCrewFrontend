import React from 'react';
import {Button, FlatList, Modal, StyleSheet, Text, View} from 'react-native';

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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  confirmText: {
    marginVertical: 10,
    fontSize: 14,
    color: 'red',
  },
});

export default AccountModal;
