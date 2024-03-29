import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LoginScreen from '../../screens/LoginScreen';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 10,
  },
  // User Icon & Search
  headerRight: {
    marginRight: 15,
  },
  headerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerSearchIcon: {
    marginLeft: 20,
  },
  headerUserIcon: {
    marginLeft: 20,
  },
  touchableButton: {
    backgroundColor: '#551E18',
    overflow: 'hidden',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    padding: 3,
    borderRadius: 50,
  },
  headerImage: {
    ...Platform.select({
      ios: {
        width: 150,
        height: 20,
      },
      android: {
        width: 150,
        height: 20,
      },
    }),
  },
});

export default LoginStackNavigator;
