import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

import { mapAction } from '../redux/actions/map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const viewMap = () => {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const { LocationErrorMsg } = map;
  const { voiceMemo } = map;

  const getVoicememo = async () => {
    await axios
      .get(process.env.API_URL)
      .then((response) => {
        dispatch(mapAction({ voiceMemo: response.data }));
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        dispatch(mapAction({ LocationErrorMsg: 'Permission to access location was denied' }));
      }
      await getVoicememo();
    })();
  }, []);

  return (
    <View style={styles.container}>
      {LocationErrorMsg ? (
        <Text>{LocationErrorMsg}</Text>
      ) : (
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
      )}
    </View>
  );
};

export default viewMap;
