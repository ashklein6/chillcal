import { put, takeLatest } from 'redux-saga/effects';
import apiCall from '../../../apiCall';

// worker saga: will be fired to retrieve list of scheduled chills
function* fetchScheduled(action) {
  try {
    // passes the current user id to get their scheduled chills
    console.log('action.payload of fetchScheduled:',action.payload);
    let scheduledChills = yield apiCall({ method: 'GET', url: `/api/chills/scheduled/${action.payload.id}` })

    // set scheduled chills in reduxState
    yield put({ type: 'SET_SCHEDULED_CHILLS', payload: scheduledChills });

  } catch (error) {
      console.log('Error with fetching scheduled chills:', error);
  }
}

  // worker saga: will be fired to update both friends list and pending friends list
  function* refreshScheduled(action) {
    try {
      // passes the current user id to get their connections
      console.log('action.payload of refreshScheduled:');
      let userId = action.payload.id;

      // update status to refreshing
      yield put({ type: 'REFRESH_SCHEDULED_START'})

      // get friends and set in reduxState
      let friends = yield apiCall({ method: 'GET', url: `/api/friends/list/${userId}` })
      yield put({ type: 'SET_FRIENDS', payload: friends });

      // get pending friends and set in reduxState
      let pendingFriends = yield apiCall({ method: 'GET', url: `/api/friends/pending/${userId}` })
      yield put({ type: 'SET_PENDING', payload: pendingFriends });

      // update status to indicate refreshing has completed
      yield put({ type: 'REFRESH_SCHEDULED_COMPLETE'})
  
    } catch (error) {
        yield put({ type: 'REFRESH_SCHEDULED_COMPLETE'})
        console.log('Error with refreshing scheduled:', error);
    }
  }

function* friendsSaga() {
  yield takeLatest('FETCH_SCHEDULED_CHILLS', fetchScheduled);
  yield takeLatest('REFRESH_SCHEDULED_CHILLS', refreshScheduled);
}

export default friendsSaga;
