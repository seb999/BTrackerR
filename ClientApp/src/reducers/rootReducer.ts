const initState = {
  userId: "",
  userEmail: "",
  isLogged: false
}

const rootReducer = (state = initState, action: any) => {
  const newState = { ...state };
  switch (action.type) {
    case "LOG_USER_ASYN":
      if(action.payload.result){
        newState.userId = action.payload.userId;
        newState.userEmail = action.payload.email;
        newState.isLogged = action.payload.result;
      }
      return newState;

    case "LOGOUT_USER_ASYN":
      newState.userId = "";
      newState.userEmail = "";
      newState.isLogged = false;
      return newState;
    default:
      return state;
  }
}

export default rootReducer