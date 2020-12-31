import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import ViewMap from '../component/view-map';
import Header from '../component/header';

const homeScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
  });
  return (
    <View style={styles.container}>
      <Header theme="Map" />
      <ViewMap />
    </View>
  );
};

export default homeScreen;
