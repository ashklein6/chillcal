import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../elements/TabBarIcon';
import FindChillsScreen from '../screens/FindChillsScreen';
import ChillsScreen from '../screens/ChillsScreen';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import UserScreen from '../screens/UserScreen';
import SettingsScreen from '../screens/SettingsScreen';

const FindChillsStack = createStackNavigator({
  FindChills: FindChillsScreen,
});

FindChillsStack.navigationOptions = {
  tabBarLabel: 'Find Chills',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios-search'
          ? `ios-search${focused ? '' : '-outline'}`
          : 'md-search'
      }
    />
  ),
};

const ChillsStack = createStackNavigator({
  Chills: ChillsScreen,
});

ChillsStack.navigationOptions = {
  tabBarLabel: 'Chills',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios-calendar'
          ? `ios-calendar${focused ? '' : '-outline'}`
          : 'md-calendar'
      }
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios-home'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const FriendsStack = createStackNavigator({
  Friends: FriendsScreen,
});

FriendsStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios-contacts'
          ? `ios-contacts${focused ? '' : '-outline'}`
          : 'md-people'
      }
    />
  ),
};

const UserStack = createStackNavigator({
  User: UserScreen,
  Settings: SettingsScreen
},
{ 
  initialRouteName: 'User',
  lazy: true
}
);

UserStack.navigationOptions = {
  tabBarLabel: 'User',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios-contact' ? 'ios-contact' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  FindChillsStack,
  ChillsStack,
  HomeStack,
  FriendsStack,
  UserStack,
  },
  { initialRouteName: 'HomeStack' }
);
