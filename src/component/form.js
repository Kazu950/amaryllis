import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

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

  const signUp = async () => {
    const body = {
      name: userName,
      password: userPassword,
    };

    const formBody = Object.keys(body)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
      .join('&');

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: formBody,
      url: process.env.VOICEMEMO_POST,
    };

    await axios(options)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
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
      <Button title="SIGN UP" style={styles.input} onPress={signUp} />
    </View>
  );
};

export default form;
