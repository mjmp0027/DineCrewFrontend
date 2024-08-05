import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ContentBoxStyles as styles} from '../styles/ContentBoxStyles';

type ContentBoxProps = {
  title: string;
  onPress: () => void;
};

const ContentBox: React.FC<ContentBoxProps> = ({title, onPress}) => (
  <TouchableOpacity style={styles.box} onPress={onPress}>
    <Text style={styles.boxText}>{title}</Text>
  </TouchableOpacity>
);

export default ContentBox;
