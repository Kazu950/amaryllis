import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import signUp from '../api/account';

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

const form = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setPassword] = useState('');

  const signUpInfo = async () => {
    const body = {
      userName,
      userPassword,
    };
    const response = await signUp(body);
    console.info(response);
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
      <Text style={{ marginBottom: 60 }}>※パスワードは8文字以上です</Text>
      <Button title="SIGN UP" style={styles.input} onPress={signUpInfo} />
    </View>
  );
};

export default form;
