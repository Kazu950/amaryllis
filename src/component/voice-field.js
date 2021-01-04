import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

import { buttonTheme, button as VoiceButton } from './button';
import VoiceSendingModal from './modal/voice-sending-modal';
import * as api from '../api/voice-memo';

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
  },
  voiceTitle: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#4f4f4f',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    marginRight: 10,
  },
});

const voiceField = () => {
  const [voiceRecording, setRecording] = useState();
  const [voiceSound, setSound] = useState();
  const [recordingNow, setRecordingNow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const account = useSelector((state) => state.account);

  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  const playSound = async (voiceUri) => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: voiceUri });

    setSound(sound);
    console.log(sound);

    console.log('Playing Sound');
    await voiceSound.playAsync()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('Finish Play Sound');
  };

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();

      setRecording(recording);
      console.log('Recording started');

      setRecordingNow(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const sendVoiceMemo = async (modalInfo) => {
    showModal();

    const body = {
      token: account.token,
      uid: account.uid,
      time: 2,
      data: 'Tetetest',
      latitude: 34.35,
      longitude: 135.24,
      title: modalInfo.title,
      summary: modalInfo.summary,
      categories: modalInfo.category,
    };

    const postVoiceMemoResponse = await api.postVoiceMemo(body);
    console.log(postVoiceMemoResponse.data);
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    showModal();
    setRecordingNow(false);

    setRecording(undefined);

    await voiceRecording.stopAndUnloadAsync();
  };

  return (
    <View style={styles.field}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
      >
        <VoiceSendingModal close={showModal} sending={sendVoiceMemo} />
      </Modal>
      <View style={styles.voiceTitle}>
        <Text style={styles.title}>タイトル</Text>
      </View>
      <View style={styles.button}>
        {recordingNow ? (
          <VoiceButton
            style={styles.item}
            size={60}
            theme={buttonTheme.stopRecording}
            func={stopRecording}
          />
        ) : (
          <VoiceButton
            style={styles.item}
            size={60}
            theme={buttonTheme.recording}
            func={startRecording}
          />
        )}
        <VoiceButton style={styles.item} theme={buttonTheme.stop} />
        <VoiceButton theme={buttonTheme.skip} />
      </View>
    </View>
  );
};

export default voiceField;
