import React, {createRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {AuthProvider} from './src/contexts/AuthContext';

// store reference to navigation object
const navigationRef = createRef();
const nav = () => navigationRef.current;

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#E85467" barStyle="dark-content" />
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <DrawerNavigator nav={nav} />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
      <View style={styles.statusBarFooter} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#E85467',
    color: '#FFF',
  },
  statusBarFooter: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: '#FFF',
        flex: 0.1,
        marginBottom: -40,
      },
      android: {
        marginBottom: 0,
        flex: 0,
        backgroundColor: '#FFF',
      },
    }),
  },
});
export default App;
