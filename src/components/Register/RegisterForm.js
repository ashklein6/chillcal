import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';

class RegisterForm extends Component {
    state = {
        username: '',
        password: '',
    };

    handleInputChangeFor = (propertyName,input) => {
        this.setState({
          [propertyName]: input,
        });
        console.log('this.state:',this.state);
    }

    registerUser = (event) => {
        event.preventDefault();
        console.log('inside registerUser:',this.state);
        axios({
            method: 'POST',
            url: '/api/user/register',
            data: this.state
        }).then((response) => {
            console.log('successful post, response:',response);
        }).catch((error) => {
            console.log('insuccessful post, error:',error);
        })
    
        if (this.state.username && this.state.password) {
          this.props.dispatch({
            type: 'REGISTER',
            payload: {
              username: this.state.username,
              password: this.state.password,
            },
          });
        } else {
          this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
      } // end registerUser

  render() {
    return (
      <View style={styles.container}>
      <StatusBar 
        barStyle="light-content"
      />
        <TextInput 
            style={styles.input}
            placeholder="username"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(input) => this.handleInputChangeFor('username',input)}
        />
        <TextInput 
            style={styles.input}
            placeholder="password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            returnKeyType="go"
            onChangeText={(input) => this.handleInputChangeFor('password',input)}
            autoCapitalize="none"
            autoCorrect={false}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={this.registerUser}>
            <Text style={styles.buttonText}>Register to Chill</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 15,
        backgroundColor: "#22a6b3",
        marginBottom: 10,
        marginHorizontal: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    },
    container: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 10,
        width: 'auto'
    }
})

const mapStateToProps = state => ({
    errors: state.errors,
});
  
  export default connect(mapStateToProps)(RegisterForm);