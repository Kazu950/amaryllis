import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/redux/store/store';
import ViewMap from './src/component/view-map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => (
  <Provider store={store} style={styles.container}>
    <ViewMap />
  </Provider>
);

export default App;
