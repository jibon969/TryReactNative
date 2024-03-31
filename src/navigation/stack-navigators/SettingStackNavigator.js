import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingScreen from '../../screens/SettingScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerShown: true,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#551E18',
          shadowColor: '#FFF',
        },

        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfileStack')}
            style={styles.headerLeft}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              color="#fff"
              style={{padding: 5}}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <View style={styles.headerContent}>
              <Text style={styles.headerSearchIcon}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SearchStack')}
                  style={styles.touchableButton}>
                  <FontAwesome name="search" size={20} color="#007036" />
                </TouchableOpacity>
              </Text>
              <Text style={styles.headerSearchIcon}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UserProfileStack')}
                  style={styles.touchableButton}>
                  <FontAwesome name="user" size={20} color="#007036" />
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        ),
      })}>
      <Stack.Screen name="Settings" component={SettingScreen} />
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
    backgroundColor: '#FFF',
    color: '#000',
    overflow: 'hidden',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    padding: 3,
    borderRadius: 50,
  },
});
export default SettingStackNavigator;
