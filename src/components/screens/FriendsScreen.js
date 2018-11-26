import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import FriendsList from '../Friends/FriendsList';
import PendingFriends from '../Friends/PendingFriends';

export default class FriendsScreen extends Component {
  static navigationOptions = {
    title: 'Friends',
  };

  state = {
    items: {}
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>ADD A CONNECTION</Text>
        <Text>PENDING CONNECTIONS</Text>
        <PendingFriends />
        <Text>YOUR CONNECTIONS</Text>
        <FriendsList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b2f6ff',
  },
})


