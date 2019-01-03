import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import { connect } from 'react-redux';

class UserScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'User',
    headerRight: <Button title='Settings' onPress={()=>{navigation.navigate('Settings')}} />
  });
  
  state = {
    items: {}
  };

  render() {
    const {navigate} = this.props.navigation;
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

const mapReduxStateToProps = reduxState => (
  {reduxState}
);

export default connect(mapReduxStateToProps)(UserScreen)