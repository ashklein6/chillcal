const chillReducer = (state={ usersChills: [], refreshing: false }, action) => {
    
  switch (action.type) {
    case 'SET_USERS_CHILLS':
      // to store scheduled chills list
      console.log('in SET_USERS_CHILLS, action.payload:',action.payload);
      return {...state, usersChills: action.payload}
    case 'REFRESH_USERS_CHILLS_START':
      // to indicate that scheduled chills list is being updated
      console.log('in REFRESH_USERS_CHILLS_START');
      return {...state, refreshing: true}
    case 'REFRESH_USERS_CHILLS_COMPLETE':
      // to indicate that updating of scheduled chills list have completed
      console.log('in REFRESH_USERS_CHILLS_COMPLETE');
      return {...state, refreshing: false}
    default:
      return state;
  }
};

export default chillReducer;
