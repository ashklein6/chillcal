import { put, takeLatest } from 'redux-saga/effects';
import apiCall from '../../../apiCall';

// worker saga will be fired to accept a friend request
function* acceptChillRequest(action) {
  // passes the id of the user, the friend, the chill, and the chill request to be accepted
  console.log('action.payload of acceptChillRequest:',action.payload);
  yield apiCall({ method: 'PUT', url: `/api/chills/request/accept`, data: action.payload })
  
  // get user's pending chill requests and upcoming chills and set in reduxState
  yield put({ type: 'FETCH_PENDING_CHILLS', payload: action.payload })
  yield put({ type: 'FETCH_UPCOMING_CHILLS', payload: action.payload })
}

// worker saga will be fired to decline a friend request
function* declineChillRequest(action) {
    // passes the id of the chill request to be accepted
    console.log('action.payload of declineChillRequest:',action.payload);
    yield apiCall({ method: 'DELETE', url: `/api/chills/request/decline/${action.payload.requestId}` });
    
    // get user's pending chill requests and set in reduxState
    yield put({ type: 'FETCH_PENDING_CHILLS', payload: action.payload });
}

// worker saga: will be fired to retrieve list of pending chill requests
function* fetchPendingChills(action) {
  try {
    // passes the current user id to get their pending connections
    console.log('action.payload of fetchPending:',action.payload);
    let pendingChills = yield apiCall({ method: 'GET', url: `/api/chills/pending/${action.payload.id}` });

    // set pending in reduxState
    yield put({ type: 'SET_PENDING_CHILLS', payload: pendingChills });

  } catch (error) {
      console.log('Error with fetching chill requests:', error);
  }
}


// worker saga: will be fired to retrieve list of upcoming chills
function* fetchUpcoming(action) {
  try {
    // passes the current user id to get their upcoming chills
    console.log('action.payload of fetchUpcoming:',action.payload);
    let upcomingChills = yield apiCall({ method: 'GET', url: `/api/chills/upcoming/${action.payload.id}` })

    // set upcoming chills in reduxState
    yield put({ type: 'SET_UPCOMING_CHILLS', payload: upcomingChills });

  } catch (error) {
      console.log('Error with fetching upcoming chills:', error);
  }
}

// worker saga: will be fired to update list of upcoming chills
function* refreshUpcoming(action) {
  try {
    // passes the current user id to get their connections
    console.log('action.payload of refreshUpcoming:');

    // update status to refreshing
    yield put({ type: 'REFRESH_UPCOMING_START'})

    // get upcoming chills and set in reduxState
    yield put({ type: 'FETCH_UPCOMING_CHILLS', payload: action.payload });

    // update status to indicate refreshing has completed
    yield put({ type: 'REFRESH_UPCOMING_COMPLETE'})

  } catch (error) {
      yield put({ type: 'REFRESH_UPCOMING_COMPLETE'})
      console.log('Error with refreshing upcoming:', error);
  }
}

function* homeSaga() {
  yield takeLatest('FETCH_UPCOMING_CHILLS', fetchUpcoming);
  yield takeLatest('REFRESH_UPCOMING_CHILLS', refreshUpcoming);
  yield takeLatest('FETCH_PENDING_CHILLS', fetchPendingChills);
  yield takeLatest('ACCEPT_CHILL_REQUEST', acceptChillRequest);
  yield takeLatest('DECLINE_CHILL_REQUEST', declineChillRequest);
}

export default homeSaga;
