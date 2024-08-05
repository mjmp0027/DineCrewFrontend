import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {MesaItemStyles as styles} from '../styles/MesaItemStyles';
import {Mesa} from '../types/Mesa';

type MesaItemProps = {
  mesa: Mesa;
  isClickable: boolean;
  onPress: () => void;
};

const MesaItem: React.FC<MesaItemProps> = ({mesa, isClickable, onPress}) => {
  const mesaStyle = isClickable ? styles.mesaAsignada : styles.mesaNoAsignada;

  return (
    <TouchableOpacity
      style={[styles.mesa, mesaStyle]}
      onPress={onPress}
      disabled={!isClickable}>
      <Text style={styles.mesaText}>{`Mesa ${mesa.numero}`}</Text>
    </TouchableOpacity>
  );
};

export default MesaItem;
