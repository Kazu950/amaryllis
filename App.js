import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/redux/store/store';
import AppNavigator from './src/navigation/app-navigator';

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
    <AppNavigator />
  </Provider>
);

export default App;
