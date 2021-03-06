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
import { NavigationActions } from 'react-navigation';
import { ListItem, SearchBar } from 'react-native-elements';

class AddFriendScreen extends Component {
  static navigationOptions = {
    title: 'Add Friend',
  };

  state = {
    search: ''
  };

  addFriend = (item) => {
    Alert.alert(
      'Add Friend',
      `Do you want to send a friend request to ${item.username}?`,
      [
        {text: 'Send Request', onPress: () => this.sendRequest(item) },
        {text: 'Cancel', onPress: () => console.log('cancel pressed'), style: 'cancel'}
      ],
      { cancelable: true }
    )
  }

  getFriendsSearch = () => {
    this.props.dispatch({ type: 'FETCH_FRIENDS_SEARCH', payload: {id: this.props.reduxState.user.id} });
  };

  handleChange = (text) => {
    this.setState({ ...this.state, search: text })
    console.log('add friend search:',this.state.search);
    this.props.dispatch({ type: 'FETCH_FRIENDS_SEARCH', payload: {search: text, user: this.props.reduxState.user.id} });
  }

  handleClear = () => {
    this.setState({ ...this.state, search: '' });
    this.props.dispatch({ type: 'CLEAR_FRIENDS_SEARCH' });
  }

  keyExtractor = ({section}) => section.title;

  onRefresh = () => {
    this.props.dispatch({ type: 'REFRESH_FRIENDS', payload: {id: this.props.reduxState.user.id} })
  }
  
  sendRequest = (item) => {
    this.props.dispatch({ type: 'SEND_FRIEND_REQUEST', payload: {id: this.props.reduxState.user.id, friendId: item.id} });
    Alert.alert(
      'Friend Request Sent',
      `Your friend request to ${item.username} has been sent!`,
      [
        {text: 'OK', onPress: () => this.props.navigation.dispatch(NavigationActions.back()) },
      ],
      { cancelable: true }
    )
  }

  renderNoContent = ({ section }) => {
    if (section.data.length == 0) {
      return (<ListItem 
                key={'search-0'}
                title='No results.'
                // leftAvatar={{ source: {uri: item.avatar_url }}}
                containerStyle={styles.listItem}
                hideChevron
              />)
    };
    return null;
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          round
          onChangeText={(text) => this.handleChange(text)}
          onClearText={() => this.handleClear}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...' 
        />
        <SectionList 
          sections = {
            [
              { 
                title: 'ADD FRIEND SEARCH RESULTS',
                data: this.props.reduxState.friends.search,
                keyExtractor: (item, index) => item + index,
                renderItem: ({ item }) => (
                  <ListItem 
                    key={'add-' + item.id}
                    title={item.username}
                    // leftAvatar={{ source: {uri: item.avatar_url }}}
                    onPress={() => this.addFriend(item)}
                    containerStyle={styles.listItem}
                />)
              }
            ]
          }
        //   renderSectionHeader = {this.renderSectionHeader}
          refreshControl = {
            <RefreshControl
              refreshing={this.props.reduxState.friends.refreshing}
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
    backgroundColor: '#efefef',
  },
  listItem: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#efefef',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 24,
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

export default connect(mapReduxStateToProps)(AddFriendScreen);