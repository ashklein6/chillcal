const homeReducer = (state={ upcoming: [], pending: [], refreshing: false }, action) => {
    
    switch (action.type) {
      case 'SET_UPCOMING_CHILLS':
        // to store upcoming chills list
        console.log('in SET_UPCOMING_CHILLS, action.payload:',action.payload);
        return {...state, upcoming: action.payload}
      case 'REFRESH_UPCOMING_START':
        // to indicate that upcoming chills list is being updated
        console.log('in REFRESH_UPCOMING_START');
        return {...state, refreshing: true}
      case 'REFRESH_UPCOMING_COMPLETE':
        // to indicate that updating of upcoming chills list have completed
        console.log('in REFRESH_UPCOMING_COMPLETE');
        return {...state, refreshing: false}
      case 'SET_PENDING_CHILLS':
        // to store pending chill requests list
        console.log('in SET_PENDING_CHILLS, action.payload:',action.payload);
        return {...state, pending: action.payload}
      default:
        return state;
    }
  };
  
  export default homeReducer;
  