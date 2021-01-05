import React, { useState } from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';

import { buttonTheme, button as Button } from './button';
import SettingCategories from './modal/setting-categories';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 60,
    backgroundColor: '#2742f2',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  headerTitle: {
    top: 15,
    left: 20,
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    paddingTop: 20,
    flex: 1,
    color: 'white',
    fontSize: 20,
    marginLeft: 255,
    fontWeight: 'bold',
    alignItems: 'flex-end',
  },
});

const header = ({ theme }) => {
  const [setingModal, setSettingModal] = useState(false);

  const showSettingModal = () => {
    setSettingModal(!setingModal);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent
        visible={setingModal}
      >
        <SettingCategories close={showSettingModal} />
      </Modal>
      {theme === 'Map' ? (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{theme}</Text>
          <Button style={styles.menu} theme={buttonTheme.menu} func={showSettingModal} />
        </View>
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{theme}</Text>
        </View>
      )}
    </View>
  );
};

export default header;
