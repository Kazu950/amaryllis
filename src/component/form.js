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
    borderColor: 'black',
    alignContent: 'center',
    borderBottomColor: 'gray',
  },
  buttonContainer: {
    marginBottom: 60,
    marginLeft: 200,
  },
  form: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginRight: 18,
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
      <View style={styles.form}>
        <Text style={styles.label}>User Name</Text>
        <TextInput
          value={userName}
          onChangeText={(inputName) => setUserName(inputName)}
          placeholder="Username"
          style={styles.input}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={userPassword}
          onChangeText={(inputPassword) => setPassword(inputPassword)}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
      </View>
      { theme === formTheme.signIn ? (
        <>
          <View style={styles.buttonContainer}>
            <Button title="SIGN IN" styles={{ marginBottom: 60 }} onPress={signinInfo} />
          </View>
          <View>
            <Button title="アカウントをお持ちでない方はこちら" onPress={onPress} />
          </View>
        </>
      ) : (
        <>
          <Text style={{ marginBottom: 60 }}>※パスワードは8文字以上です</Text>
          <View style={styles.buttonContainer}>
            <Button title="SIGN UP" onPress={signUpInfo} />
          </View>
          <View>
            <Button title="すでにアカウントをお持ちの方はこちら" onPress={onPress} />
          </View>

        </>
      )}

    </View>
  );
};
