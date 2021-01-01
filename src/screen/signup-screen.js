import React from 'react';
import { StyleSheet } from 'react-native';

import { formTheme, form as Form } from '../component/form';
import Header from '../component/header';

const signUpScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  return (
    <>
      <Header theme="Sign Up" />
      <Form style={styles.container} theme={formTheme.signUp} onPress={() => navigation.navigate('SignIn')} />
    </>
  );
};

export default signUpScreen;
