import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const buttonTheme = {
  menu: 'navicon',
  recording: 'microphone',
  stopRecording: 'microphone-slash',
  stop: 'pause',
  skip: 'forward',
};

export const button = ({ theme, func }) => (
  <TouchableOpacity onPress={func}>
    { theme === buttonTheme.menu ? (
      <FontAwesome
        name={theme}
        size={22}
        color={theme === buttonTheme.menu ? 'white' : '#4f4f4f'}
        style={{ paddingTop: 20, paddingRight: 25 }}
      />
    ) : (
      <FontAwesome
        name={theme}
        size={20}
        color="#4f4f4f"
      />
    ) }

  </TouchableOpacity>
);

export default button;
