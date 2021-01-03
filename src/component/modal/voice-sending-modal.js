import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  form: {
    marginBottom: 15,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSection: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderColor: 'black',
  },
});

const voiceSendingModal = ({ close, sending }) => {
  const categoryChecked = {
    c01: false,
    c02: false,
    c03: false,
    c04: false,
    c05: false,
  };
  const [isClicked, setClicked] = useState(categoryChecked);
  const [inputTitle, setTitle] = useState('');
  const [inputSummary, setSummary] = useState('');

  const response = () => {
    const dataForSending = {};

    const validCategory = Object.keys(isClicked).filter((categoryId) => {
      if (isClicked[categoryId]) {
        return categoryId.toString();
      }
    });

    dataForSending.title = inputTitle;
    dataForSending.summary = inputSummary;
    dataForSending.category = validCategory;

    sending(dataForSending);
    close();
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ScrollView>
          <Text style={styles.modalText}>録音が完了しました！</Text>
          <View style={styles.form}>
            <Text>・タイトル</Text>
            <TextInput
              placeholder="タイトルを入力"
              value={inputTitle}
              onChangeText={(title) => setTitle(title)}
              style={styles.input}
            />
          </View>
          <View style={styles.form}>
            <Text>・概要</Text>
            <TextInput
              placeholder="概要を入力"
              value={inputSummary}
              onChangeText={(summary) => setSummary(summary)}
              style={styles.input}
            />
          </View>
          <Text style={styles.modalText}>・該当するカテゴリーを選択してください</Text>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isClicked.c01}
              onChange={() => setClicked((state) => ({ ...state, c01: !isClicked.c01 }))}
            />
            <Text style={styles.paragraph}>観光</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isClicked.c02}
              onChange={() => setClicked((state) => ({ ...state, c02: !isClicked.c02 }))}
            />
            <Text style={styles.paragraph}>音楽</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isClicked.c03}
              onChange={() => setClicked((state) => ({ ...state, c03: !isClicked.c03 }))}
            />
            <Text style={styles.paragraph}>グルメ</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isClicked.c04}
              onChange={() => setClicked((state) => ({ ...state, c04: !isClicked.c04 }))}
            />
            <Text style={styles.paragraph}>アニメ・ゲーム</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isClicked.c05}
              onChange={() => setClicked((state) => ({ ...state, c05: !isClicked.c05 }))}
            />
            <Text style={styles.paragraph}>雑談</Text>
          </View>
          <View style={styles.buttonSection}>
            <Button title="キャンセル" onPress={close} />
            <Button title="送信" onPress={response} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default voiceSendingModal;
