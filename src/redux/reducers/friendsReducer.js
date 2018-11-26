const friendsReducer = (state={ friends: [{username:'loading', id: -1}], pending: [] }, action) => {
    switch (action.type) {
      case 'SET_FRIENDS':
        console.log('in SET_FRIENDS, action.payload:',action.payload);
        return {friends: action.payload, pending: state.pending}
      case 'SET_PENDING':
        console.log('in SET_PENDING, action.payload:',action.payload);
        return {friends: state.friends, pending: action.payload}
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default friendsReducer;
  