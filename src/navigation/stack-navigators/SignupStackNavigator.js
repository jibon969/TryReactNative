import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform, StyleSheet} from 'react-native';
import SignupScreen from '../../screens/SignupScreen';

const Stack = createStackNavigator();

const SignupStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="Signup" component={SignupScreen} />
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

export default SignupStackNavigator;
