import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, List, FlatList, ListItem } from 'react-native';
import { connect } from 'react-redux';

class FriendsList extends Component {

    state = {
        loading: false,
        friends: [{id: 8, username: 'alex'},{id: 6, username: 'lauren'}],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false
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

    keyExtractor = (item, index) => String(index);

    renderItem = ({ item }) => (
        // <ListItem 
        //     title={item.username}
        //     // leftAvatar={{ source: {uri: item.avatar_url }}}
        // />
        <Text>{item.username}</Text>
    );

    componentWillMount() {
        this.getFriends();
    }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.friends}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
        />
        <Text>{JSON.stringify(this.props.reduxState.friends.friends)}</Text>

        <Button title="reload friends" onPress={this.getFriends}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {

    },
})

const mapReduxStateToProps = reduxState => (
    {reduxState}
);

export default connect(mapReduxStateToProps)(FriendsList);