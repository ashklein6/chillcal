const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
    console.log('in SET_USER, action:',action);
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
