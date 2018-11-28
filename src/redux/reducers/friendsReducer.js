const friendsReducer = (state={ friends: [], pending: [], refreshing: false, search: [] }, action) => {
    
    switch (action.type) {
      case 'SET_FRIENDS':
        // to store friends list
        console.log('in SET_FRIENDS, action.payload:',action.payload);
        return {...state, friends: action.payload}
      case 'SET_PENDING':
        // to store pending friends list
        console.log('in SET_PENDING, action.payload:',action.payload);
        return {...state, pending: action.payload}
      case 'REFRESH_FRIENDS_START':
        // to indicate that friends and pending friends lists are being updated
        console.log('in REFRESH_FRIENDS_START');
        return {...state, refreshing: true}
      case 'REFRESH_FRIENDS_COMPLETE':
        // to indicate that updating of friends and pending friends lists have completed
        console.log('in REFRESH_FRIENDS_COMPLETE');
        return {...state, refreshing: false}
      default:
        return state;
    }
  };
  
  export default friendsReducer;
  