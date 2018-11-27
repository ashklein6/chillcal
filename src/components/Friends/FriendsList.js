import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, List, FlatList, SectionList } from 'react-native';
import { ListItem } from 'react-native-elements';
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

    keyExtractor = (item, index) => item.username;

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
    }

  render() {
    return (
      <View style={styles.container}>
      
        <SectionList 
            sections = {[
                {   title: 'YOUR CONNECTIONS',
                    data: this.props.reduxState.friends.friends,
                }
            ]}
            key = {this.keyExtractor}
            renderItem = {this.renderItem}
            renderSectionHeader = {this.renderSectionHeader}
        />
        <Text>{JSON.stringify(this.props.reduxState.friends.friends)}</Text>

        <Button title="reload friends" onPress={this.getFriends}/>
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

export default connect(mapReduxStateToProps)(FriendsList);