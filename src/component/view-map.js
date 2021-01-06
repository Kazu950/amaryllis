import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { permissionAction, voiceAction, currentLocationAction } from '../redux/actions/map';
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
  const { LocationErrorMsg, voiceMemo, currentLatitude, currentLongitude } = map;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        dispatch(permissionAction({ LocationErrorMsg: 'Permission to access location was denied' }));
      } else {
        const response = await api.getVoiceMemo()
          .then((voice) => voice.map((res) => ({
            data: res.data,
            latitude: res.latitude,
            longitude: res.longitude,
            title: res.title,
            summary: res.summary,
          })))
          .catch((err) => {
            console.error(err);
          });
        dispatch(voiceAction({ voiceMemo: response }));
      }
    })();
  }, []);

  const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    })
      .then((res) => res.coords)
      .catch((err) => {
        console.log('47', err);
        return err;
      });
    dispatch(currentLocationAction({
      currentLatitude: location.latitude, currentLongitude: location.longitude,
    }));
  };

  Location.watchPositionAsync({
    timeInterval: 2000,
    accuracy: Location.Accuracy.High,
  }, getCurrentLocation);

  return (
    <View style={styles.container}>
      {LocationErrorMsg ? (
        <Text>{LocationErrorMsg}</Text>
      ) : (
        <View>
          {!currentLatitude ? (
            <Text>位置情報を取得中</Text>
          ) : (
            <MapView style={styles.map}>
              <Marker
                coordinate={{ latitude: currentLatitude || 0, longitude: currentLongitude || 0 }}
                title="現在地"
              />
              {voiceMemo.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{ latitude: marker.latitude || 0, longitude: marker.longitude || 0 }}
                  title={marker.title}
                  description={marker.summary}
                />
              ))}
            </MapView>
          )}
        </View>
      )}
    </View>
  );
};

export default viewMap;
