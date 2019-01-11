import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  RefreshControl,
  Alert
} from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'ChillCal',
  };

  state = {
    
  };

  acceptChillRequest = (item) => {
    this.props.dispatch({ type: 'ACCEPT_CHILL_REQUEST', payload: {id: this.props.reduxState.user.id, friendId: item.requester_id, requestId: item.request_id, chillsUsersId: item.chills_users_id} });
  }

  declineChillRequest = (item) => {
    this.props.dispatch({ type: 'DECLINE_CHILL_REQUEST', payload: {id: this.props.reduxState.user.id, requestId: item.request_id} });
  }

  getChillRequests = () => {
    this.props.dispatch({ type: 'FETCH_PENDING_CHILLS', payload: {id: this.props.reduxState.user.id} });
  }

  getUpcomingChills = () => {
    this.props.dispatch({ type: 'FETCH_UPCOMING_CHILLS', payload: {id: this.props.reduxState.user.id} });
  };

  keyExtractor = ({section}) => section.title;

  onRefresh = () => {
    this.props.dispatch({ type: 'REFRESH_UPCOMING_CHILLS', payload: {id: this.props.reduxState.user.id} })
    this.props.dispatch({ type: 'FETCH_PENDING_CHILLS', payload: {id: this.props.reduxState.user.id} })
  }

  respondToRequest = (item) => {
    Alert.alert(
      'Chill Request',
      `Do you want to accept this chill request from ${item.requester_name}?`,
      [
        {text: 'Accept', onPress: () => this.acceptChillRequest(item) },
        {text: 'Decline', onPress: () => this.declineChillRequest(item) },
        {text: 'Cancel', onPress: () => console.log('cancel pressed'), style: 'cancel'}
      ],
      { cancelable: true }
    )
  }

  renderNoContent = ({ section }) => {
    if (section.data.length == 0 && section.title == 'PENDING CHILL REQUESTS') {
      return (<ListItem 
        key={'pending-0'}
        title='You have no pending chill requests.'
        // leftAvatar={{ source: {uri: item.avatar_url }}}
        containerStyle={styles.listItem}
        hideChevron
      />)
    }
    if (section.data.length == 0 && section.title == 'UPCOMING CHILLS') {
      return (<ListItem 
        key={'upcoming-0'}
        title='You have no upcoming chills.'
        // leftAvatar={{ source: {uri: item.avatar_url }}}
        containerStyle={styles.listItem}
        hideChevron
      />)
    }
  }

  renderSectionHeader = ({ section }) => (
    <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );
  
  viewSession = (item) => {
    const {navigate} = this.props.navigation;

    if (item.created_user_id == this.props.reduxState.user.id) {
      navigate('ManageSession', {item});
    } else {
      navigate('ViewSession', {item});
    }
  }

  componentWillMount() {
    this.getUpcomingChills();
    this.getChillRequests();
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <SectionList 
          sections = {
            [ {
              title: 'PENDING CHILL REQUESTS',
              data: this.props.reduxState.home.pending,
              keyExtractor: (item, index) => item + index,
              renderItem: ({ item }) => (
                <ListItem 
                  key={'request-' + item.id}
                  // title={moment(item.start_time).format('dddd[,] MMM Do h:mm A')}
                  title={moment(item.start_time).format('dddd[,] MMM Do') == moment(item.end_time).format('dddd[,] MMM Do') ?
                    moment(item.start_time).format('dddd[,] MMM Do h:mm A')+' - '+moment(item.end_time).format('h:mm A') :
                    moment(item.start_time).format('dddd[,] MMM Do h:mm A')+' - \n'+moment(item.end_time).format('dddd[,] MMM Do h:mm A')}
                  subtitle={item.details + ' with ' + item.friend_username}
                  titleNumberOfLines={2}
                  subtitleNumberOfLines={4}
                  // leftAvatar={{ source: {uri: https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg }}}
                  onPress={() => this.respondToRequest(item)}
                  containerStyle={styles.listItem}
                />)
              },
              {
                title: 'UPCOMING CHILLS',
                data: this.props.reduxState.home.upcoming,
                keyExtractor: (item, index) => item + index,
                renderItem: ({ item }) => (
                  <ListItem 
                    key={'chill-' + item.id}
                    // title={moment(item.start_time).format('dddd[,] MMM Do h:mm A')}
                    title={moment(item.start_time).format('dddd[,] MMM Do') == moment(item.end_time).format('dddd[,] MMM Do') ?
                      moment(item.start_time).format('dddd[,] MMM Do h:mm A')+' - '+moment(item.end_time).format('h:mm A') :
                      moment(item.start_time).format('dddd[,] MMM Do h:mm A')+' - \n'+moment(item.end_time).format('dddd[,] MMM Do h:mm A')}
                    subtitle={item.details + ' with ' + item.friend_username}
                    titleNumberOfLines={2}
                    subtitleNumberOfLines={4}
                    // leftAvatar={{ source: {uri: https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg }}}
                    onPress={() => this.viewSession(item)}
                    containerStyle={styles.listItem}
                  />)
              }
            ]
          }
          renderSectionHeader = {this.renderSectionHeader}
          refreshControl = {
            <RefreshControl
              refreshing={this.props.reduxState.home.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          renderSectionFooter = {this.renderNoContent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2f6ff',
  },
  listItem: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#b2f6ff',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    opacity: 0.8,
  },
})

const mapReduxStateToProps = reduxState => (
  {reduxState}
);

export default connect(mapReduxStateToProps)(HomeScreen);