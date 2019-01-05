import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../elements/TabBarIcon';

import AddFriendScreen from '../screens/AddFriendScreen';
import AddSessionScreen from '../screens/AddSessionScreen';
import ChillsScreen from '../screens/ChillsScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import FindChillsScreen from '../screens/FindChillsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import HomeScreen from '../screens/HomeScreen';
import ManageSessionScreen from '../screens/ManageSessionScreen';
import SessionScreen from '../screens/SessionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UserScreen from '../screens/UserScreen';
import ViewSessionScreen from '../screens/ViewSessionScreen';

const FindChillsStack = createStackNavigator({
    FindChills: FindChillsScreen,
    Session: SessionScreen,
    ViewSession: ViewSessionScreen
  },
  { 
    initialRouteName: 'FindChills',
    lazy: true
  }
);

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
    Session: SessionScreen,
    ManageSession: ManageSessionScreen,
    ViewSession: ViewSessionScreen
  },
  { 
    initialRouteName: 'Chills',
    lazy: true
  }
);

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

const FriendsStack = createStackNavigator({
    Friends: FriendsScreen,
    AddFriend: AddFriendScreen,
    Connection: ConnectionScreen
  },
  { 
    initialRouteName: 'Friends',
    lazy: true
  }
);

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
    Settings: SettingsScreen,
    AddSession: AddSessionScreen,
    ManageSession: ManageSessionScreen
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

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Friends: FriendsStack,
  ManageSession: ManageSessionScreen,
  ViewSession: ViewSessionScreen
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

export default createBottomTabNavigator({
  FindChillsStack,
  ChillsStack,
  HomeStack,
  FriendsStack,
  UserStack,
  },
  { initialRouteName: 'HomeStack' }
);
