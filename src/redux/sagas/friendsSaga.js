import { put, takeLatest } from 'redux-saga/effects';
import apiCall from '../../../apiCall';

// worker Saga: will be fired on "REGISTER" actions
function* fetchFriends(action) {
  try {
    // passes the current user id to get their connections
    console.log('action.payload of fetchFriends:',action.payload);
    let friends = yield apiCall({ method: 'GET', url: `/api/friends/${action.payload.id}` })

    // set friends in reduxState
    yield put({ type: 'SET_FRIENDS', payload: friends });

  } catch (error) {
      console.log('Error with fetching friends:', error);
  }
}

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

  function* refreshFriends(action) {
    try {
      // passes the current user id to get their connections
      console.log('action.payload of refreshFriends:');

      // update status to refreshing
      yield put({ type: 'REFRESH_FRIENDS_START'})

      // get friends and set in reduxState
      let friends = yield apiCall({ method: 'GET', url: `/api/friends/${action.payload.id}` })
      yield put({ type: 'SET_FRIENDS', payload: friends });

      // get pending friends and set in reduxState
      let pendingFriends = yield apiCall({ method: 'GET', url: `/api/friends/pending/${action.payload.id}` })
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
}

export default friendsSaga;
