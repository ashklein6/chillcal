import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

class PendingFriends extends Component {

    state = {
        loading: false,
        pending: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false
    }

    getPending = () => {
        console.log('in getFriends');
        this.props.dispatch({ type: 'FETCH_PENDING', payload: {id: this.props.reduxState.user.id} });
    }

    componentWillMount() {
        this.getPending();
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.reduxState.friends.pending)}</Text>
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

export default connect(mapReduxStateToProps)(PendingFriends);