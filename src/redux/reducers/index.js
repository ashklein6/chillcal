import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import friends from './friendsReducer';
import available from './availableReducer';
import scheduled from './scheduledReducer';
import chill from './chillReducer';
import home from './homeReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  friends, // will have an array of a user's connections
  available, // will have an array of a user's available chills
  scheduled, // will have an array of a user's scheduled chills
  chill, // will aid the creating of new chills
  home, // includes chill requests and upcoming chills
});

export default rootReducer;
