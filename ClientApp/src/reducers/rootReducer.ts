// import axios from 'axios'
import axios from 'axios';

const initState = {
  userId: "",
  userEmail: "",
  isLogged: false
}

const rootReducer = (state = initState, action: any) => {
  const newStatew = { ...state };
  const apiUrl = '/api/Account';
  switch (action.type) {
    case "LOG_USER":
      let loginViewModel = { Email: action.payload.userLogin, Password: action.payload.userPassword, RememberMe: action.payload.rememberMe, Result: false, UserId: "" }
      axios.post(apiUrl + "/LoginFromClient/", loginViewModel).then(res => {
        console.log(res.data.userId);
        newStatew.userId = res.data.userId;
      })
        .catch(error => {
          throw (error);
        });

      return newStatew

    case "LOG_USER_ASYN":
      console.log("asynch " + action.payload);
      newStatew.userId = action.payload;

    default:
      return state;
  }
}

export default rootReducer