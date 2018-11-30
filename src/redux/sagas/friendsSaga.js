import { put, takeLatest } from 'redux-saga/effects';
import apiCall from '../../../apiCall';

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
      let friends = yield apiCall({ method: 'GET', url: `/api/friends/${userId}` })
      yield put({ type: 'SET_FRIENDS', payload: friends });

      // get pending friends and set in reduxState
      let pendingFriends = yield apiCall({ method: 'GET', url: `/api/friends/pending/${userId}` })
      yield put({ type: 'SET_PENDING', payload: pendingFriends });

      // update status to indicate refreshing has completed
      yield put({ type: 'REFRESH_FRIENDS_COMPLETE'})
  
    } catch (error) {
        yield put({ type: 'REFRESH_FRIENDS_COMPLETE'})
        console.log('Error with refreshing friends:', error);
    }
  }

function* friendsSaga() {
  yield takeLatest('FETCH_FRIENDS', fetchFriends);
  yield takeLatest('FETCH_PENDING', fetchPending);
  yield takeLatest('REFRESH_FRIENDS', refreshFriends);
  yield takeLatest('FETCH_FRIENDS_SEARCH', fetchFriendsSearch);

}

export default friendsSaga;
