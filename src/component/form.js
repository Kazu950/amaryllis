import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { signUp, signIn } from '../api/account';
import { signInAction, signUpAction } from '../redux/actions/accounts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderColor: 'black',
    marginBottom: 60,
  },
});

export const formTheme = {
  signIn: 'signIn',
  signUp: 'signUp',
};

export const form = ({ theme, onPress }) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setPassword] = useState('');

  const dispatch = useDispatch();

  const signUpInfo = async () => {
    const body = {
      userName,
      userPassword,
    };
    const response = await signUp(body);
    if (response.message === 'success') {
      dispatch(signUpAction({
        login: 'true',
        token: response.token,
        uid: response.uid,
      }));
    }
  };

  const signinInfo = async () => {
    const body = {
      userName,
      userPassword,
    };
    const response = await signIn(body);
    if (response.message === 'success') {
      dispatch(signInAction({
        login: 'true',
        token: response.token,
        uid: response.uid,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={userName}
        onChangeText={(inputName) => setUserName(inputName)}
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        value={userPassword}
        onChangeText={(inputPassword) => setPassword(inputPassword)}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      { theme === formTheme.signIn ? (
        <>
          <Button title="SIGN IN" style={{ marginBottom: 60 }} onPress={signinInfo} />
          <Button title="アカウントをお持ちでない方はこちら" onPress={onPress} />
        </>
      ) : (
        <>
          <Text style={{ marginBottom: 60 }}>※パスワードは8文字以上です</Text>
          <Button title="SIGN UP" style={styles.input} onPress={signUpInfo} />
          <Button title="すでにアカウントをお持ちの方はこちら" style={styles.input} onPress={onPress} />
        </>
      )}

    </View>
  );
};
