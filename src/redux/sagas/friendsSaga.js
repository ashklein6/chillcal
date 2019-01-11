import { put, takeLatest } from 'redux-saga/effects';
import apiCall from '../../../apiCall';

// worker saga will be fired to accept a friend request
function* acceptFriendRequest(action) {
  // passes the id of the user, the friend, the chill, and the chill request to be accepted
  console.log('action.payload of acceptFriendRequest:',action.payload);
  yield apiCall({ method: 'PUT', url: `/api/friends/accept/${action.payload.connectionId}` })
  
  // get user's pending chill requests and upcoming chills and set in reduxState
  yield put({ type: 'FETCH_PENDING', payload: action.payload })
  yield put({ type: 'FETCH_FRIENDS', payload: action.payload })
}

// worker saga will be fired to decline a friend request
function* declineFriendRequest(action) {
    // passes the id of the chill request to be accepted
    console.log('action.payload of declineFriendRequest:',action.payload);
    yield apiCall({ method: 'DELETE', url: `/api/friends/decline/${action.payload.connectionId}` });
    
    // get user's pending chill requests and set in reduxState
    yield put({ type: 'FETCH_PENDING', payload: action.payload });
}

// worker saga: will be fired to retrieve list of friends
function* fetchFriends(action) {
  try {
    // passes the current user id to get their connections
    console.log('action.payload of fetchFriends:',action.payload);
    let friends = yield apiCall({ method: 'GET', url: `/api/friends/list/${action.payload.id}` })

    // set friends in reduxState
    yield put({ type: 'SET_FRIENDS', payload: friends });

  } catch (error) {
      console.log('Error with fetching friends:', error);
  }
}

// worker saga: will be fired to retrieve list of users on Add Friend Screen
function* fetchFriendsSearch(action) {
  try {
    // passes the search query to get users that match
    console.log('action.payload of fetchFriendsSearch:',action.payload);
    let results;
    if (action.payload.search == '') {
      results = []
    } else {
      results = yield apiCall({ method: 'GET', url: `/api/friends/search`, params: action.payload })
    }
    // set friends search results in reduxState
    yield put({ type: 'SET_FRIENDS_SEARCH', payload: results });

  } catch (error) {
      console.log('Error with fetching friends search results:', error);
  }
}

// worker saga: will be fired to retrieve list of pending friend requests
function* fetchPending(action) {
    try {
      // passes the current user id to get their pending connections
      console.log('action.payload of fetchPending:',action.payload);
      let pendingFriends = yield apiCall({ method: 'GET', url: `/api/friends/pending/${action.payload.id}` })
  
      // set pending in reduxState
      yield put({ type: 'SET_PENDING', payload: pendingFriends });
  
    } catch (error) {
        console.log('Error with fetching friends:', error);
    }
  }

  // worker saga: will be fired to update both friends list and pending friends list
  function* refreshFriends(action) {
    try {
      // passes the current user id to get their connections
      console.log('action.payload of refreshFriends:');
      let userId = action.payload.id;

      // update status to refreshing
      yield put({ type: 'REFRESH_FRIENDS_START'})

      // get friends and set in reduxState
      yield put({ type: 'FETCH_FRIENDS', payload: action.payload });

      // get pending friends and set in reduxState
      yield put({ type: 'FETCH_PENDING', payload: action.payload });

      // update status to indicate refreshing has completed
      yield put({ type: 'REFRESH_FRIENDS_COMPLETE'})
  
    } catch (error) {
        yield put({ type: 'REFRESH_FRIENDS_COMPLETE'})
        console.log('Error with refreshing friends:', error);
    }
  }

  // worker saga: will be fired to send friend request 
  function* sendFriendRequest(action) {
    try {
      // passes the id of the current user and the requested friend's id
      console.log('action.payload of sendFriendRequest:',action.payload);
      yield apiCall({ method: 'POST', url: `/api/friends`, data: action.payload })

      // get user's available and scheduled chills and set in reduxState
      yield put({ type: 'FETCH_FRIENDS', payload: action.payload });
      yield put({ type: 'FETCH_PENDING', payload: action.payload });

    } catch (error) {
        console.log('Error with sending friend request:', error);
    }
  }

function* friendsSaga() {
  yield takeLatest('FETCH_FRIENDS', fetchFriends);
  yield takeLatest('FETCH_PENDING', fetchPending);
  yield takeLatest('REFRESH_FRIENDS', refreshFriends);
  yield takeLatest('FETCH_FRIENDS_SEARCH', fetchFriendsSearch);
  yield takeLatest('ACCEPT_FRIEND_REQUEST', acceptFriendRequest);
  yield takeLatest('DECLINE_FRIEND_REQUEST', declineFriendRequest);
  yield takeLatest('SEND_FRIEND_REQUEST', sendFriendRequest);
}

export default friendsSaga;
