import React, {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, StyleSheet, View} from 'react-native';
import {routes, screens} from './RouteItems';

/*==================================================================
                    Added stack-navigators
===================================================================*/
import HomeStackNavigator from './stack-navigators/HomeStackNavigator';
import AboutStackNavigator from './stack-navigators/AboutStackNavigator';
import ContactStackNavigator from './stack-navigators/ContactStackNavigator';
import SearchStackNavigator from './stack-navigators/SearchStackNavigator';
import UserProfileStackNavigator from './stack-navigators/UserProfileStackNavigator';
import LoginStackNavigator from './stack-navigators/LoginStackNavigator';
import SignupStackNavigator from './stack-navigators/SignupStackNavigator';
import SettingStackNavigator from './stack-navigators/SettingStackNavigator';

const Tab = createBottomTabNavigator();

const tabOptions = ({route}) => {
  const item = routes.find(routeItem => routeItem.name === route.name); // get the route config object

  if (!item.showInTab) {
    // hide this tab
    return {
      tabBarButton: () => <View style={styles.tabBottomStyle} />,
      headerShown: false,
      tabBarStyle: styles.tabContainer,
      title: item.title,
    };
  }

  return {
    tabBarIcon: ({focused}) => item.icon(focused),
    tabBarLabel: () => (
      <Text style={styles.tabBarLabel}>{item.title || ''}</Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabContainer,
    title: item.title,
  };
};

const BottomTabNavigator = () => {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Tab.Navigator screenOptions={tabOptions}>
      {isAuthenticated ? (
        <>
          <Tab.Screen name={screens.HomeStack} component={HomeStackNavigator} />
          <Tab.Screen
            name={screens.AboutStack}
            component={AboutStackNavigator}
          />
          <Tab.Screen
            name={screens.ContactStack}
            component={ContactStackNavigator}
          />
          <Tab.Screen
            name={screens.SearchStack}
            component={SearchStackNavigator}
          />
          <Tab.Screen
            name={screens.UserProfileStack}
            component={UserProfileStackNavigator}
          />
          <Tab.Screen
            name={screens.SettingStack}
            component={SettingStackNavigator}
          />
        </>
      ) : (
        // Render the LoginStackNavigator and SignupStackNavigator if not authenticated
        <>
          <Tab.Screen
            name={screens.LoginStack}
            component={LoginStackNavigator}
            options={{
              tabBarStyle: {display: 'none'},
            }}
          />
          <Tab.Screen
            name={screens.SignupStack}
            component={SignupStackNavigator}
            options={{
              tabBarStyle: {display: 'none'},
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#292929',
    fontSize: 12,
  },
  tabContainer: {
    height: 60,
  },
  tabBottomStyle: {
    width: 0,
  },
});

export default BottomTabNavigator;
