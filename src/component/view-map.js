import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        dispatch(mapAction({ LocationErrorMsg: 'Permission to access location was denied' }));
      }
      const response = await api.getVoiceMemo();
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
        </View>
      )}
    </View>
  );
};

export default viewMap;
