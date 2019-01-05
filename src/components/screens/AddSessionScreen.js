import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class AddSessionScreen extends Component {
  static navigationOptions = {
    title: 'AddSession',
  };

  state = {
    items: {}
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Session Screen</Text>
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

export default connect(mapReduxStateToProps)(AddSessionScreen)