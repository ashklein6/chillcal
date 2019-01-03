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

class FindChillsScreen extends Component {
  static navigationOptions = {
    title: 'FindChills',
  };

  state = {
    chills: [{title: 'November 30th - 8:00 AM - 8:45AM', subtitle: 'Coffee with Lauren'}, {title: 'December 2nd - 11:15 AM - 11:45 AM', subtitle: 'Lunch with Kaitlyn'}]
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
                data: this.state.chills,
                keyExtractor: (item, index) => item + index,
                renderItem: ({ item }) => (
                  <ListItem 
                    key={'availableChills-' + item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    // leftAvatar={{ source: {uri: https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg }}}
                    onPress={() => navigate('AddFriend')}
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