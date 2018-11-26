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
      // passes the current user id to get their connections
      console.log('action.payload of fetchPending:',action.payload);
      let pendingFriends = yield apiCall({ method: 'GET', url: `/api/friends/pending/${action.payload.id}` })
  
      // set friends in reduxState
      yield put({ type: 'SET_PENDING', payload: pendingFriends });
  
    } catch (error) {
        console.log('Error with fetching friends:', error);
    }
  }

function* friendsSaga() {
  yield takeLatest('FETCH_FRIENDS', fetchFriends);;
  yield takeLatest('FETCH_PENDING', fetchPending);;
}

export default friendsSaga;
