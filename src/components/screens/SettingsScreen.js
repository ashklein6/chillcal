import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';
import { connect } from 'react-redux';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    items: {}
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
        <Button 
          onPress = {() => this.props.dispatch({ type: 'LOGOUT' })}
          title = 'Log Out'
        />
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

export default connect(mapReduxStateToProps)(SettingsScreen)