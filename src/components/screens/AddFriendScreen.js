import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
} from 'react-native';
import { ListItem } from 'react-native-elements';

class AddFriendScreen extends Component {
  static navigationOptions = {
    title: 'Add Friend',
  };

  state = {

  };

  friendsList = () => {
    console.log('friends.friends:',this.props.reduxState.friends.friends)
    if (this.props.reduxState.friends.friends = []) {
        return [{username: 'loading...'}]
    }
    return this.props.reduxState.friends.friends;
  };

  getFriends = () => {
    console.log('in getFriends');
    this.props.dispatch({ type: 'FETCH_FRIENDS', payload: {id: this.props.reduxState.user.id} });
  };

  getPending = () => {
    console.log('in getFriends');
    this.props.dispatch({ type: 'FETCH_PENDING', payload: {id: this.props.reduxState.user.id} });
  }

  keyExtractor = (item, index) => item.username;

  keyExtractorFriends = (item, index) => 'friends' + item.username;

  keyExtractorPending = (item, index) => 'pending' + item.username;

  renderItem = ({ item }) => (
    <ListItem 
        key={item.id}
        title={item.username}
        // leftAvatar={{ source: {uri: item.avatar_url }}}
    />
  );

  renderSectionHeader = ({ section }) => (
    <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  componentWillMount() {
    this.getFriends();
    this.getPending();
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList 
          sections = {[
              { 
                title: 'ADD A CONNECTION',
                data: [{ username: 'Add friend by username', id: 0 }],
                key: this.keyExtractor,
                renderItem: this.renderItem,
              },
              { 
                title: 'PENDING CONNECTIONS',
                data: this.props.reduxState.friends.pending,
                key: this.keyExtractorPending,
                renderItem: this.renderItem,
              },
              {
                title: 'YOUR CONNECTIONS',
                data: this.props.reduxState.friends.friends,
                key: this.keyExtractorFriends,
                renderItem: this.renderItem,
              }
          ]}
          key = {this.keyExtractor}
          // renderItem = {this.renderItem}
          renderSectionHeader = {this.renderSectionHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#efefef',
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

export default connect(mapReduxStateToProps)(AddFriendScreen);