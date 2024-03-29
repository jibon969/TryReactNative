import React, {createRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';

// global variable
const navigationRef = createRef();
const nav = () => navigationRef.current;

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#183153" barStyle="light-content" />
        <NavigationContainer ref={navigationRef}>
          <DrawerNavigator nav={nav} />
        </NavigationContainer>
      </SafeAreaView>
      <View style={styles.statusBarFooter} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#183153',
    color: '#FFF',
  },
  statusBarFooter: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: '#fff',
        flex: 0.1,
        marginBottom: -40,
      },
      android: {
        marginBottom: 0,
        flex: 0,
        backgroundColor: '#fff',
      },
    }),
  },
});

export default App;
