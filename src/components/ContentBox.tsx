import React from 'react';
import {TouchableOpacity, Text, ImageBackground, ViewStyle} from 'react-native';
import {ContentBoxStyles as styles} from '../styles/ContentBoxStyles';

type ContentBoxProps = {
  title: string;
  onPress: () => void;
  imageSource: any;
  style?: ViewStyle;
};

const ContentBox: React.FC<ContentBoxProps> = ({
  title,
  onPress,
  imageSource,
  style,
}) => (
  <TouchableOpacity style={[styles.box, style]} onPress={onPress}>
    <ImageBackground source={imageSource} style={styles.image}>
      <Text style={styles.boxText}>{title}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

export default ContentBox;
