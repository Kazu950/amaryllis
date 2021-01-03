import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import ViewMap from '../component/view-map';
import Header from '../component/header';
import VoiceField from '../component/voice-field';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

const homeScreen = () => (
  <View style={styles.container}>
    <Header theme="Map" />
    <ViewMap />
    <VoiceField />
  </View>
);

export default homeScreen;
