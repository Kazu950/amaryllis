import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const buttonTheme = {
  recording: 'microphone',
  stopRecording: 'microphone-slash',
  stop: 'pause',
  skip: 'forward',
};

export const button = ({ theme, func }) => (
  <TouchableOpacity onPress={func}>
    <FontAwesome name={theme} size={20} color="#4f4f4f" />
  </TouchableOpacity>
);

export default button;
