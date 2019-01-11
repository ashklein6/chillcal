import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

class ManageSessionScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {

    if (navigation.getParam('edit') === true) {
      return {
        headerLeft: <Button title={'Cancel'} onPress={navigation.getParam('cancelEdit', () => {console.log('error')})} />,
        headerTitle: 'Manage Session',
        headerRight: <Button title={'Save'} onPress={navigation.getParam('saveChill', () => {console.log('error')})} />
      };
    } else {
      return {
        headerTitle: 'Manage Session',
        headerRight: <Button title={'Edit'} onPress={navigation.getParam('editChill', () => {console.log('error')})} />
      };
    }
  };

  state = {
    chillId: this.props.navigation.state.params.item.chill_id,
    details: this.props.navigation.state.params.item.details || '',
    edit: false,
    endDateTime: this.props.navigation.state.params.item.end_time || '',
    endDateTimePickerVisible: false,
    startDateTime: this.props.navigation.state.params.item.start_time || '',
    startDateTimePickerVisible: false,
    friend: this.props.navigation.state.params.item.friend_username || '',
  };

  cancelEdit = () => {
    this.setState({
      ...this.state,
      edit: false
    })
    this.props.navigation.setParams({ 
      cancelChill: this.cancelEdit, 
      editChill: this.editChill, 
      saveChill: this.saveChill, 
      edit: false
    });
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

  editChill = () => {
    this.setState({
      ...this.state,
      edit: true
    })
    this.props.navigation.setParams({ 
      cancelChill: this.cancelEdit, 
      editChill: this.editChill, 
      saveChill: this.saveChill, 
      edit: true
    });
  }

  friendDisplay = () => {
    const {params} = this.props.navigation.state;
    if (params.item.requested_user_id === null) {
        return (null);
    } else {
        if (params.item.friend_username != null) {
            return  (<View>
                        <Text style={styles.header}>FRIEND</Text>
                        <TextInput 
                            style={styles.input}
                            value={this.state.friend}
                            editable={false}
                        />
                    </View>)
        }
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

  saveChill = () => {
    let startTime = this.state.startDateTime;
    let endTime = this.state.endDateTime;
    startTime.setHours(startTime.getHours() - 6);
    endTime.setHours(endTime.getHours() - 6);

    console.log('in saveChill');
    let newChill = {
      start_time: startTime,
      end_time: endTime,
      details: this.state.details
    }
    this.props.dispatch({ type: 'UPDATE_CHILL_DETAILS', payload: {newChill: newChill, chillId: this.state.chillId, id: this.props.reduxState.user.id}})
    this.setState({
      ...this.state,
      edit: false
    })
    this.props.navigation.setParams({ 
      cancelChill: this.cancelEdit, 
      editChill: this.editChill, 
      saveChill: this.saveChill, 
      edit: false
    });
    Alert.alert(
      'Chill Updated',
      `Your ${this.state.details} chill has been updated!`,
      [
        {text: 'OK', onPress: () => this.props.navigation.dispatch(NavigationActions.back()) },
      ],
      { cancelable: true }
    )
  }

  showEndDateTimePicker = () => {
    if (this.state.edit == true) {
      this.setState({ ...this.state, endDateTimePickerVisible: true });
    }
  };

  showStartDateTimePicker = () => this.setState({ ...this.state, startDateTimePickerVisible: true });

  componentDidMount() {
    this.props.navigation.setParams({ 
      cancelEdit: this.cancelEdit, 
      editChill: this.editChill, 
      saveChill: this.saveChill, 
      edit: this.state.edit 
    });
    console.log('this.props.navigation.state.params.item:', this.props.navigation.state.params.item);
  }

  render() {
    const {navigate} = this.props.navigation;
    const {params} = this.props.navigation.state;

    return (
      <ScrollView style={styles.container}>
        {this.state.edit == false 
        ? 
        <React.Fragment>
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
        </React.Fragment>
        :
        <React.Fragment>
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
          <this.friendDisplay />
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
        </React.Fragment>
        }
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
    fontSize: 24,
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

export default connect(mapReduxStateToProps)(ManageSessionScreen);