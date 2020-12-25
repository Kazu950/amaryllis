import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

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

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        dispatch(mapAction({ LocationErrorMsg: 'Permission to access location was denied' }));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {LocationErrorMsg ? <Text>{LocationErrorMsg}</Text> : <MapView style={styles.map} />}
    </View>
  );
};

export default viewMap;
