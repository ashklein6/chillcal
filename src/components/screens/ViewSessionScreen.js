import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class ViewSessionScreen extends Component {
  static navigationOptions = {
    title: 'ViewSession',
  };

  state = {
    items: {}
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>View Session Screen</Text>
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

export default connect(mapReduxStateToProps)(ViewSessionScreen)