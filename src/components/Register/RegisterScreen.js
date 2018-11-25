import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import RegisterForm from './RegisterForm';

export default class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'User',
  };

  state = {
    items: {}
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
            <Image 
                style={styles.logo}
                source={require('../../../assets/images/penguin.png')}
            />
            <Text style={styles.title}>ChillCal</Text>
        </View>
        <View style={styles.formContainer}>
            <RegisterForm />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ed6df',
  },
  formContainer: {

  },
  logo: {
    height: 125,
    width: 106
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
      color: 'white',
      marginTop: 10,
      fontSize: 36
  }
})


