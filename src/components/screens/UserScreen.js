import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  RefreshControl,
  Button
} from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

class UserScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'User',
    headerRight: <Button title='Settings' onPress={()=>{navigation.navigate('Settings')}} />
  });
  
  state = {

  };

  getUsersChills = () => {
    this.props.dispatch({ type: 'FETCH_USERS_CHILLS', payload: {id: this.props.reduxState.user.id} });
  };

  keyExtractor = ({section}) => section.title;

  onRefresh = () => {
    this.props.dispatch({ type: 'REFRESH_USERS_CHILLS', payload: {id: this.props.reduxState.user.id} })
  }

  renderNoContent = ({ section }) => {
    if (section.data.length == 0 && section.title == 'MANAGE YOUR CHILLS') {
      return (<ListItem 
                key={'pending-0'}
                title={`You haven't created any chills yet.`}
                // leftAvatar={{ source: {uri: item.avatar_url }}}
                containerStyle={styles.listItem}
                hideChevron
              />)
    } else if (section.data.length == 0 && section.title == 'YOUR CONNECTIONS') {
      return (<ListItem 
        key={'friends-0'}
        title='You have no friends.'
        // leftAvatar={{ source: {uri: item.avatar_url }}}
        containerStyle={styles.listItem}
        hideChevron
      />)
    }
    return null;
  }

  renderSectionHeader = ({ section }) => (
    <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  componentWillMount() {
    this.getUsersChills();
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <SectionList 
          sections = {
            [
              { 
                title: 'CREATE A NEW CHILL',
                data: [{ username: 'Create new chill', id: 0 }],
                keyExtractor: (item, index) => item + index,
                renderItem: ({ item }) => (
                  <ListItem 
                    key={'add-' + item.id}
                    title={item.username}
                    // leftAvatar={{ source: {uri: item.avatar_url }}}
                    // onPress={() => navigate('AddFriend')}
                    onPress={() => navigate('AddSession')}
                    containerStyle={styles.listItem}
                />)
              },
              { 
                title: 'MANAGE YOUR CHILLS',
                data: this.props.reduxState.chill.usersChills,
                keyExtractor: (item, index) => item + index,
                renderItem: ({ item }) => (
                  <ListItem 
                    key={'pending-' + item.id}
                    title={moment(item.start_time).format('dddd[,] MMM Do h:mm A')+' - '+
                           moment(item.end_time).format('h:mm A')}
                    subtitle={item.details}
                    titleNumberOfLines={2}
                    // leftAvatar={{ source: {uri: item.avatar_url }}}
                    onPress={() => navigate('ManageSession', { item })}
                    containerStyle={styles.listItem}
                  />)
              }
            ]
          }
          renderSectionHeader = {this.renderSectionHeader}
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

export default connect(mapReduxStateToProps)(UserScreen)