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
import moment from 'moment';

class FindChillsScreen extends Component {
  static navigationOptions = {
    title: 'Find Chills',
  };

  state = {

  };

  getAvailableChills = () => {
    this.props.dispatch({ type: 'FETCH_AVAILABLE_CHILLS', payload: {id: this.props.reduxState.user.id} });
  };

  keyExtractor = ({section}) => section.title;

  onRefresh = () => {
    this.props.dispatch({ type: 'REFRESH_AVAILABLE_CHILLS', payload: {id: this.props.reduxState.user.id} })
  }

  renderNoContent = ({ section }) => {
    if (section.data.length == 0 && section.title == 'AVAILABLE CHILLS') {
      return (<ListItem 
                key={'pending-0'}
                title='You have no available chills.'
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

  viewSession = (item) => {
    const {navigate} = this.props.navigation;

    if (item.created_user_id == this.props.reduxState.user.id) {
      navigate('ManageSession', {item});
    } else {
      navigate('ViewSession', {item});
    }
  }

  componentWillMount() {
    this.getAvailableChills();
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <SectionList 
          sections = {
            [
              {
                title: 'AVAILABLE CHILLS',
                data: this.props.reduxState.available.available,
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

export default connect(mapReduxStateToProps)(FindChillsScreen);