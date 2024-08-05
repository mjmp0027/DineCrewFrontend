import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MenuBarStyles as styles} from '../styles/MenuBarStyles';

type MenuBarProps = {
  onNotificationsPress: () => void;
  onLogoutPress: () => void;
};

const MenuBar: React.FC<MenuBarProps> = ({
  onNotificationsPress,
  onLogoutPress,
}) => (
  <View style={styles.menu}>
    <Text style={styles.menuText}>Menú</Text>
    <View style={styles.icons}>
      <TouchableOpacity onPress={onNotificationsPress}>
        <Icon name="notifications-outline" size={25} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogoutPress}>
        <Icon name="person-circle-outline" size={25} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

export default MenuBar;
