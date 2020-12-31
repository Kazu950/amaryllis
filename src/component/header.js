import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const header = ({ theme }) => {
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      height: 60,
      backgroundColor: '#2742f2',
    },
    title: {
      top: 15,
      left: 20,
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{theme}</Text>
    </View>
  );
};

export default header;
