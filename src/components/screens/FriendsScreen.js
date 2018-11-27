import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  RefreshControl
} from 'react-native';
import { ListItem } from 'react-native-elements';

class FriendsScreen extends Component {
  static navigationOptions = {
    title: 'Friends',
  };

  state = {
    
  };

  getFriends = () => {
    this.props.dispatch({ type: 'FETCH_FRIENDS', payload: {id: this.props.reduxState.user.id} });
  };

  getPending = () => {
    this.props.dispatch({ type: 'FETCH_PENDING', payload: {id: this.props.reduxState.user.id} });
  }

  keyExtractor = ({section}) => section.title;

  onRefresh = () => {
    this.props.dispatch({ type: 'REFRESH_FRIENDS', payload: {id: this.props.reduxState.user.id} })
  }

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
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <SectionList 
          sections = {[
              { 
                title: 'ADD A CONNECTION',
                data: [{ username: 'Add friend by username', id: 0 }],
                keyExtractor: (item, index) => item + index,
                renderItem: ({ item }) => (
                  <ListItem 
                    key={'add-' + item.id}
                    title={item.username}
                    // leftAvatar={{ source: {uri: item.avatar_url }}}
                    // onPress={() => navigate('AddFriend')}
                    onPress={() => navigate('AddFriend')}
                    style={styles.listItem}
                />)
              },
              { 
                title: 'PENDING CONNECTIONS',
                data: this.props.reduxState.friends.pending,
                keyExtractor: (item, index) => item + index,
                renderItem: ({ item }) => (
                  <ListItem 
                    key={'friends-' + item.id}
                    title={item.username}
                    // leftAvatar={{ source: {uri: item.avatar_url }}}
                    onPress={() => navigate('AddFriend')}
                    style={styles.listItem}
                    chevron
                  />)
              },
              {
                title: 'YOUR CONNECTIONS',
                data: this.props.reduxState.friends.friends,
                keyExtractor: (item, index) => item + index,
                renderItem: ({ item }) => (
                  <ListItem 
                    key={'pending-' + item.id}
                    title={item.username}
                    // leftAvatar={{ source: {uri: item.avatar_url }}}
                    onPress={() => navigate('AddFriend')}
                    style={styles.listItem}
                  />)
              }
          ]}
          renderSectionHeader = {this.renderSectionHeader}
          refreshControl = {
            <RefreshControl
              refreshing={this.props.reduxState.friends.refreshing}
              onRefresh={this.onRefresh}
            />
          }
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

export default connect(mapReduxStateToProps)(FriendsScreen);