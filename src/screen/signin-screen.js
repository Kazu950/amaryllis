import React from 'react';
import { StyleSheet } from 'react-native';

import { formTheme, form as Form } from '../component/form';
import Header from '../component/header';

const signInScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  return (
    <>
      <Header theme="Sign In" />
      <Form style={styles.container} theme={formTheme.signIn} onPress={() => navigation.navigate('SignUp')} />
    </>
  );
};

export default signInScreen;
