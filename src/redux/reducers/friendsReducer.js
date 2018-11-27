const friendsReducer = (state={ friends: [{username:'loading', id: -1}], pending: [], refreshing: false }, action) => {
    switch (action.type) {
      case 'SET_FRIENDS':
        console.log('in SET_FRIENDS, action.payload:',action.payload);
        return {...state, friends: action.payload}
      case 'SET_PENDING':
        console.log('in SET_PENDING, action.payload:',action.payload);
        return {...state, pending: action.payload}
      case 'REFRESH_FRIENDS_START':
        console.log('in REFRESH_FRIENDS_START');
        return {...state, refreshing: true}
      case 'REFRESH_FRIENDS_COMPLETE':
        console.log('in REFRESH_FRIENDS_COMPLETE');
        return {...state, refreshing: false}
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default friendsReducer;
  