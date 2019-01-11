import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import moment from 'moment';
import moment from 'moment-timezone';

class AddSessionScreen extends Component {
  static navigationOptions = {
    title: 'Add Session',
  };

  state = {
    details: '',
    endDateTime: '',
    endDateTimePickerVisible: false,
    startDateTime: '',
    startDateTimePickerVisible: false,
  };

  

  dateTimeEnd = () => {
    if (this.state.endDateTime == '') {
        return <Text style={styles.touchableOpacityText}>Click to set end day and time</Text>
    } else {
        return <Text style={styles.enteredText}>{moment(this.state.endDateTime).utc().format('dddd[,] MMM Do h:mm A')}</Text>
    }
  }

  dateTimeStart = () => {
      console.log('running dateTimeStart', this.state.startDateTime);
      if (this.state.startDateTime == '') {
          console.log('caught blank startDateTime');          
          return <Text style={styles.touchableOpacityText}>Click to set start day and time</Text>
      } else {
          console.log('caught', this.state.startDateTime);
          return <Text style={styles.enteredText}>{moment(this.state.startDateTime).utc().format('dddd[,] MMM Do h:mm A')}</Text>
      }
  }

  handleEndDatePicked = (date) => {
    date.setHours(date.getHours() - 6);
    console.log('A date has been picked: ', date);
    let newState = this.state;
    newState.endDateTime = date;
    this.setState(newState);
    this.hideEndDateTimePicker();
  };

  handleInputChangeFor = (propertyName,text) => {
    this.setState({
        ...this.state,
        [propertyName]: text,
    });
    console.log('this.state:',this.state);
  }

  handleStartDatePicked = (date) => {
    date.setHours(date.getHours() - 6);
    console.log('A date has been picked: ', date);
    let newState = this.state;
    newState.startDateTime = date;
    this.setState(newState);
    this.hideStartDateTimePicker();
  };

  hideEndDateTimePicker = () => this.setState({ ...this.state, endDateTimePickerVisible: false });

  hideStartDateTimePicker = () => this.setState({ ...this.state, startDateTimePickerVisible: false });

  saveChill = () => {
    console.log('in saveChill');
    const {navigate} = this.props.navigation;

    let newChill = {
      start_time: this.state.startDateTime,
      end_time: this.state.endDateTime,
      details: this.state.details
    }
    this.props.dispatch({ type: 'CREATE_NEW_CHILL', payload: {newChill: newChill, id: this.props.reduxState.user.id}})
    Alert.alert(
      'Chill created',
      `Your ${this.state.details} chill has been created!`,
      [
        {text: 'OK', onPress: () => this.props.navigation.dispatch(NavigationActions.back()) },
      ],
      { cancelable: true }
    )
  }

  showEndDateTimePicker = () => this.setState({ ...this.state, endDateTimePickerVisible: true });

  showStartDateTimePicker = () => this.setState({ ...this.state, startDateTimePickerVisible: true });

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>START TIME</Text>
        <TouchableOpacity onPress={this.showStartDateTimePicker} style={styles.touchableOpacity}>
            <this.dateTimeStart />
        </TouchableOpacity>
        <Text style={styles.header}>END TIME</Text>
        <TouchableOpacity onPress={this.showEndDateTimePicker} style={styles.touchableOpacity}>
            <this.dateTimeEnd />
        </TouchableOpacity>
        <Text style={styles.header}>DETAILS</Text>
        <TextInput 
            style={styles.input}
            placeholder="Enter details about this chill..."
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.details}
            onChangeText={(input) => this.handleInputChangeFor('details',input)}
            multiline
            blurOnSubmit
            maxLength={1000}
        />
        <DateTimePicker
          isVisible={this.state.startDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
          date={new Date(this.state.startDateTime)}
          minuteInterval={5}
          titleIOS={'Select Start Date and Time'}
          mode={'datetime'}
        />
        <DateTimePicker
          isVisible={this.state.endDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
          date={new Date(this.state.endDateTime)}
          titleIOS={'Select End Date and Time'}
          minuteInterval={5}
          mode={'datetime'}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={this.saveChill}>
            <Text style={styles.buttonText}>Save Chill</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
        paddingVertical: 15,
        backgroundColor: "#22a6b3",
        marginBottom: 10,
        marginHorizontal: 30,
        marginTop: 10,
  },
  buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
  },
  container: {
    flex: 1,
    backgroundColor: '#b2f6ff',
    padding: 10
  },
  enteredText: {
    opacity: 1.0
  },
  header: {
    fontSize: 14,
    marginBottom: 8,
    color: 'black',
    opacity: 0.8,
  },
  input: {
    minHeight: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 'auto',
    justifyContent: 'center',
    // flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  touchableOpacity: {
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 'auto',
    justifyContent: 'center',
  },
  touchableOpacityText: {
    opacity: 0.5
  }
})

const mapReduxStateToProps = reduxState => (
  {reduxState}
);

export default connect(mapReduxStateToProps)(AddSessionScreen);