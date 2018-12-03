const scheduledReducer = (state={ scheduled: [], refreshing: false }, action) => {
    
    switch (action.type) {
      case 'SET_SCHEDULED_CHILLS':
        // to store scheduled chills list
        console.log('in SET_SCHEDULED_CHILLS, action.payload:',action.payload);
        return {...state, scheduled: action.payload}
      case 'REFRESH_SCHEDULED_START':
        // to indicate that scheduled chills list is being updated
        console.log('in REFRESH_SCHEDULED_START');
        return {...state, refreshing: true}
      case 'REFRESH_SCHEDULED_COMPLETE':
        // to indicate that updating of scheduled chills list have completed
        console.log('in REFRESH_SCHEDULED_COMPLETE');
        return {...state, refreshing: false}
      default:
        return state;
    }
  };
  
  export default scheduledReducer;
  