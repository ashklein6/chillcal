import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button
} from 'react-native';
import moment from 'moment';

class ViewSessionScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerTitle: 'View Session',
    }
  };

  state = {
    chillsUsersId: this.props.navigation.state.params.item.chills_users_id,
    details: this.props.navigation.state.params.item.details || '',
    endDateTime: this.props.navigation.state.params.item.end_time || '',
    endDateTimePickerVisible: false,
    startDateTime: this.props.navigation.state.params.item.start_time || '',
    startDateTimePickerVisible: false,
    friend: this.props.navigation.state.params.item.friend_username || '',
  };

  buttonClicked = () => {
    console.log('in buttonClicked')
    if (this.props.navigation.state.params.item.connection_id) {
      this.cancelChill();
    } else {
      this.requestToChill();
    }
  }

  cancelChill = () => {
    console.log('in cancel chill');
    this.props.dispatch({ type: 'CANCEL_CHILL_FRIEND', payload: {id: this.props.reduxState.user.id, chillsUsersId: this.state.chillsUsersId} });
  }

  dateTimeEnd = () => {
    if (this.state.endDateTime == '') {
        return <Text style={styles.touchableOpacityText}>Click to set end day and time</Text>
    } else {
        return <Text style={styles.enteredText}>{moment(this.state.endDateTime).format('dddd[,] MMM Do h:mm A')}</Text>
    }
  }

  dateTimeStart = () => {
    console.log('this.state.startDateTime:',this.state.startDateTime);
    console.log('with moment:',moment(this.state.startDateTime).format('dddd[,] MMM Do h:mm A'))
      console.log('running dateTimeStart', this.state.startDateTime);
      if (this.state.startDateTime == '') {
          console.log('caught blank startDateTime');          
          return <Text style={styles.touchableOpacityText}>Click to set start day and time</Text>
      } else {
          console.log('caught', this.state.startDateTime);
          return <Text style={styles.enteredText}>{moment(this.state.startDateTime).format('dddd[,] MMM Do h:mm A')}</Text>
      }
  }

  handleEndDatePicked = (date) => {
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
    console.log('A date has been picked: ', date);
    let newState = this.state;
    newState.startDateTime = date;
    this.setState(newState);
    this.hideStartDateTimePicker();
  };

  hideEndDateTimePicker = () => this.setState({ ...this.state, endDateTimePickerVisible: false });

  hideStartDateTimePicker = () => this.setState({ ...this.state, startDateTimePickerVisible: false });

  requestToChill = () => {
    console.log('in request to chill');
  }

  showEndDateTimePicker = () => {
    if (this.state.edit == true) {
      this.setState({ ...this.state, endDateTimePickerVisible: true });
    }
  };

  showStartDateTimePicker = () => this.setState({ ...this.state, startDateTimePickerVisible: true });

  render() {
    const {navigate} = this.props.navigation;
    const {params} = this.props.navigation.state;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>START TIME</Text>
        <View style={styles.touchableOpacity}>
          <this.dateTimeStart />
        </View>
        <Text style={styles.header}>END TIME</Text>
        <View style={styles.touchableOpacity}>
          <this.dateTimeEnd />
        </View>
        <Text style={styles.header}>DETAILS</Text>
        <View style={styles.touchableOpacity}>
          <Text>{this.state.details}</Text>
        </View>
        {params.item.friend_username != null ?
        <React.Fragment>
          <Text style={styles.header}>FRIEND</Text>
          <View style={styles.touchableOpacity}>
            <Text>{this.state.friend}</Text>
          </View> 
        </React.Fragment>
        : null }
        <Button title={params.item.connection_id ? 'Cancel Chill': 'Request to Chill'} onPress={this.buttonClicked}/>
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

export default connect(mapReduxStateToProps)(ViewSessionScreen);