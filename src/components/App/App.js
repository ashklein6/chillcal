import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'; 

export default class App extends Component {
  render() {
    console.log('rendering in App.js');
    return (
      <View style={styles.container}>
        <Text>ChillCal</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
