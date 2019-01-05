import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class ManageSessionScreen extends Component {
  static navigationOptions = {
    title: 'ManageSession',
  };

  state = {
    items: {}
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Manage Session Screen</Text>
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

export default connect(mapReduxStateToProps)(ManageSessionScreen)