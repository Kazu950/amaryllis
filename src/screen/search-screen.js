import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';

import Header from '../component/header';

const searchScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
  });
  return (
    <View style={styles.container}>
      <Header theme="Search" />
      <Text>Search Screen</Text>
    </View>
  );
};

export default searchScreen;
