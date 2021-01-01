import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';

import { mapAction } from '../redux/actions/map';
import * as api from '../api/voice-memo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    flex: 1,
  },
});

const viewMap = () => {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const { LocationErrorMsg, voiceMemo } = map;
  const [voiceRecording, setRecording] = useState();
  const [voiceSound, setSound] = useState();

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
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');

    setRecording(undefined);

    await voiceRecording.stopAndUnloadAsync();
    const uri = voiceRecording.getURI();

    playSound(uri);

    const body = {
      token: process.env.TOKEN,
      uid: process.env.UID,
      time: 2,
      data: 'Tetetest',
      latitude: 34.35,
      longitude: 135.24,
      title: 'Test1',
      summary: 'テストテストテスト',
      categories: 'c01',
    };
    const postVoiceMemoResponse = await api.postVoiceMemo(body);
    console.log({ postVoiceMemoResponse });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        dispatch(mapAction({ LocationErrorMsg: 'Permission to access location was denied' }));
      }
      const response = await api.getVoiceMemo();
      console.log(response);
      dispatch(mapAction({ voiceMemo: response }));
    })();
  }, []);

  return (
    <View style={styles.container}>
      {LocationErrorMsg ? (
        <Text>{LocationErrorMsg}</Text>
      ) : (
        <View>
          <MapView style={styles.map}>
            {voiceMemo.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.title}
                description={marker.summary}
              />
            ))}
          </MapView>
          <Button title="Play Sound" onPress={playSound} />
          <Button
            title={voiceRecording ? 'Stop Recording' : 'Start Recording'}
            onPress={voiceRecording ? stopRecording : startRecording}
          />
        </View>
      )}
    </View>
  );
};

export default viewMap;
