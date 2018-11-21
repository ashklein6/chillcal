import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

export default class UserScreen extends Component {
  static navigationOptions = {
    title: 'User',
  };

  state = {
    items: {}
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>User Screen</Text>
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


