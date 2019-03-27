
const initState = {
  userId: "",
  userEmail: "",
  isLogged: false,
  isFirstRender: true,
  deviceList: new Array<Device>(),
  isDeviceSaved : false,
}

const rootReducer = (state = initState, action: any) => {
  const newState = { ...state };
  switch (action.type) {
    case "LOG_USER_ASYN":
      if (action.payload.result) {
        newState.userId = action.payload.userId;
        newState.userEmail = action.payload.email;
        newState.isLogged = action.payload.result;
        newState.isFirstRender = false;
      }
      else {
        newState.userId = "";
        newState.isLogged = false;
        newState.isFirstRender = false;
      }
      return newState;

    case "LOGOUT_USER_ASYN":
      newState.userId = "";
      newState.userEmail = "";
      newState.isLogged = false;
      newState.isFirstRender = true;
      return newState;

    case "TRACKER_LIST":
      newState.deviceList = action.payload
      return newState;

    case "TRACKER_SAVED":
      newState.isDeviceSaved = true;
      newState.deviceList = action.payload
      return newState;

    case "TRACKER_DELETED":
      //newState.isDeviceSaved = true;
      newState.deviceList = action.payload
      return newState;
    default:
      return state;
  }
}

export default rootReducer