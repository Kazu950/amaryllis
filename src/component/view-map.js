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
  console.log('------------------map----------------');
  console.log(map);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        dispatch(permissionAction({ LocationErrorMsg: 'Permission to access location was denied' }));
      } else {
        const response = await api.getVoiceMemo();
        const location = await Location.getCurrentPositionAsync({});
        dispatch(currentLocationAction({
          currentLatitude: location.coords.latitude, currentLongitude: location.coords.longitude,
        }));
        dispatch(voiceAction({ voiceMemo: response }));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {LocationErrorMsg ? (
        <Text>{LocationErrorMsg}</Text>
      ) : (
        <View>
          {!currentLatitude ? (
            <Text>位置情報取得中</Text>
          ) : (
            <MapView style={styles.map}>
              <Marker
                coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
                title="現在地"
              />
              {voiceMemo.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
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
