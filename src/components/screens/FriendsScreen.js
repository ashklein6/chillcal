import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
} from 'react-native';
import { ListItem } from 'react-native';
import FriendsList from '../Friends/FriendsList';
import PendingFriends from '../Friends/PendingFriends';

class FriendsScreen extends Component {
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

const mapReduxStateToProps = reduxState => (
  {reduxState}
);

export default connect(mapReduxStateToProps)(FriendsScreen);