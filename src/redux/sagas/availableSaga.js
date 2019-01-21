import { put, takeLatest } from 'redux-saga/effects';
import apiCall from '../../../apiCall';

// worker saga: will be fired to retrieve list of available chills
function* fetchAvailable(action) {
  try {
    // passes the current user id to get their available chills
    console.log('action.payload of fetchAvailable:',action.payload);
    let availableChills = yield apiCall({ method: 'GET', url: `/api/chills/available/${action.payload.id}` })

    // set available chills in reduxState
    yield put({ type: 'SET_AVAILABLE_CHILLS', payload: availableChills });

  } catch (error) {
      console.log('Error with fetching available chills:', error);
  }
}

// worker saga: will be fired to update list of available chills
function* refreshAvailable(action) {
  try {
    // passes the current user id to get their connections
    console.log('action.payload of refreshAvailable:');

    // update status to refreshing
    yield put({ type: 'REFRESH_AVAILABLE_START'})

    // get available chills and set in reduxState
    yield put({ type: 'FETCH_AVAILABLE_CHILLS', payload: action.payload });

    // update status to indicate refreshing has completed
    yield put({ type: 'REFRESH_AVAILABLE_COMPLETE'})

  } catch (error) {
      yield put({ type: 'REFRESH_AVAILABLE_COMPLETE'})
      console.log('Error with refreshing available:', error);
  }
}

function* availableSaga() {
  yield takeLatest('FETCH_AVAILABLE_CHILLS', fetchAvailable);
  yield takeLatest('REFRESH_AVAILABLE_CHILLS', refreshAvailable);
}

export default availableSaga;
