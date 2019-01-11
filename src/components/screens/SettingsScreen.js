import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import apiCall from '../../../apiCall';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Tech',
  };

  state = {
    items: {}
  };

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>TECHNOLOGY USED</Text>
        <Text style={styles.bullet}>{`React with Redux, Saga`}</Text>
        <Text style={styles.bullet}>{`React Native`}</Text>
        <Text style={styles.bullet}>{`React Native Modal DateTime Picker`}</Text>
        <Text style={styles.bullet}>{`Moment.js`}</Text>
        <Text style={styles.bullet}>{`Expo`}</Text>
        <Text style={styles.bullet}>{`PostgreSQL`}</Text>
        <Text style={styles.bullet}>{`Node.js, Express`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#b2f6ff',
  },
  header: {
    textAlign: 'right',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10
  },
  bullet: {
    textAlign: 'left',
    fontSize: 16
  }
})

const mapReduxStateToProps = reduxState => (
  {reduxState}
);

export default connect(mapReduxStateToProps)(SettingsScreen)