import { put, takeLatest } from 'redux-saga/effects';
import apiCall from '../../../apiCall';

// worker saga: will be fired to cancel a chill that the user did not create
function* cancelChillFriend(action) {
  try {
    // passes the id of the chill to be deleted
    console.log('action.payload of cancelChillFriend:',action.payload);
    yield apiCall({ method: 'PUT', url: `/api/chills/cancel`, data: action.payload })

    // get user's available and scheduled chills and set in reduxState
    yield put({ type: 'FETCH_AVAILABLE_CHILLS', payload: action.payload });
    yield put({ type: 'FETCH_SCHEDULED_CHILLS', payload: action.payload });

  } catch (error) {
      console.log('Error with canceling chill:', error);
  }
}

// worker saga: will be fired to cancel a chill request
function* cancelChillRequest(action) {
  try {
    // passes the id of the request to be deleted
    console.log('action.payload of cancelChillRequest:',action.payload);
    yield apiCall({ method: 'DELETE', url: `/api/chills/request/decline/${action.payload.requestId}`})

    // get user's available and scheduled chills and set in reduxState
    yield put({ type: 'FETCH_AVAILABLE_CHILLS', payload: action.payload });
    yield put({ type: 'FETCH_SCHEDULED_CHILLS', payload: action.payload });

  } catch (error) {
      console.log('Error with canceling chill request:', error);
  }
}

// worker saga: will be fired to post new chill to database
function* createChill(action) {
  try {
    // passes the current user id and the details of the new chill
    console.log('action.payload of createChill:',action.payload);
    yield apiCall({ method: 'POST', url: `/api/chills`, data: action.payload })

    // get user's chills and set in reduxState
    yield put({ type: 'FETCH_USERS_CHILLS', payload: action.payload });

  } catch (error) {
      console.log('Error with posting new chill:', error);
  }
}

// worker saga: will be fired to retrieve list of user's created chills
function* fetchUsersChills(action) {
  try {
    // passes the current user id to get user's created chills
    console.log('action.payload of fetchUsersChills:',action.payload);
    let usersChills = yield apiCall({ method: 'GET', url: `/api/chills/created/${action.payload.id}` })

    // set user's created chills in reduxState
    yield put({ type: 'SET_USERS_CHILLS', payload: usersChills });

  } catch (error) {
      console.log(`Error with fetching user's chills:`, error);
  }
}

// worker saga: will be fired to update list of user's created chills
function* refreshUsersChills(action) {
  try {
    // passes the current user id to get user's connections
    console.log('action.payload of refreshUsersChills:');

    // update status to refreshing
    yield put({ type: 'REFRESH_USERS_CHILLS_START'})

    // get user's chills and set in reduxState
    yield put({ type: 'FETCH_USERS_CHILLS', payload: action.payload });

    // update status to indicate refreshing has completed
    yield put({ type: 'REFRESH_USERS_CHILLS_COMPLETE'})

  } catch (error) {
      yield put({ type: 'REFRESH_USERS_CHILLS_COMPLETE'})
      console.log(`Error with refreshing user's chills:`, error);
  }
}

// worker saga: will be fired to request to chill with friend
function* requestToChill(action) {
  try {
    // passes the id of the chill the request is for
    console.log('action.payload of requestToChill:',action.payload);
    yield apiCall({ method: 'POST', url: `/api/chills/request`, data: action.payload })

    // get user's available and scheduled chills and set in reduxState
    yield put({ type: 'FETCH_AVAILABLE_CHILLS', payload: action.payload });
    yield put({ type: 'FETCH_SCHEDULED_CHILLS', payload: action.payload });

  } catch (error) {
      console.log('Error with canceling chill:', error);
  }
}

function* updateChillDetails(action) {
  try {
    // passes the current user id and the updated details of the chill
    console.log('action.payload of createChill:',action.payload);
    yield apiCall({ method: 'PUT', url: `/api/chills/edit`, data: action.payload })

    // get user's chills and set in reduxState
    yield put({ type: 'FETCH_USERS_CHILLS', payload: action.payload });

  } catch (error) {
      console.log('Error with posting new chill:', error);
  }
}

function* scheduledSaga() {
  yield takeLatest('CREATE_NEW_CHILL', createChill);
  yield takeLatest('FETCH_USERS_CHILLS', fetchUsersChills);
  yield takeLatest('REFRESH_USERS_CHILLS', refreshUsersChills);
  yield takeLatest('UPDATE_CHILL_DETAILS', updateChillDetails);
  yield takeLatest('CANCEL_CHILL_FRIEND', cancelChillFriend);
  yield takeLatest('REQUEST_TO_CHILL', requestToChill);
  yield takeLatest('CANCEL_CHILL_REQUEST', cancelChillRequest);
}

export default scheduledSaga;
