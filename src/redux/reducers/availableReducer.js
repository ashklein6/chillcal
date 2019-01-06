const availableReducer = (state={ available: [], refreshing: false }, action) => {
    
    switch (action.type) {
      case 'SET_AVAILABLE_CHILLS':
        // to store available chills list
        console.log('in SET_AVAILABLE_CHILLS, action.payload:',action.payload);
        return {...state, available: action.payload}
      case 'REFRESH_AVAILABLE_START':
        // to indicate that available chills list is being updated
        console.log('in REFRESH_AVAILABLE_START');
        return {...state, refreshing: true}
      case 'REFRESH_AVAILABLE_COMPLETE':
        // to indicate that updating of available chills list have completed
        console.log('in REFRESH_AVAILABLE_COMPLETE');
        return {...state, refreshing: false}
      default:
        return state;
    }
  };
  
  export default availableReducer;
  