import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import { formTheme, form as Form } from '../component/form';
import Header from '../component/header';

const signUpScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
  });
  return (
    <View style={styles.container}>
      <Header theme="Sign Up" />
      <Form style={styles.container} theme={formTheme.signUp} onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
};

export default signUpScreen;
