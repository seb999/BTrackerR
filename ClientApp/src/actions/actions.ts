 import axios from 'axios';
 const apiUrl = '/api/Account';    

export const logUserAsyn = (user: any) => {
  return async (dispatch : any) => {
     let loginViewModel = {Email : user.userLogin, Password : user.userPassword, RememberMe : user.rememberMe, Result:false, UserId:""}

     try {
      const res = await axios.post<any>(apiUrl + "/LoginFromClient/", loginViewModel);
      return dispatch(logUserSuccess(res.data));
    }
    catch (error) {
      throw (error);
    }
  };
}

export const logUserSuccess = (data: any) => {
  return {
    type: "LOG_USER_ASYN",
    payload: data
  }
}

export const logoutUserAsyn = (user: any) => {
  return async (dispatch : any) => {
     try {
      const res = await axios.get<any>(apiUrl + "/Logout/");
      return dispatch(logoutuserSuccess(res.data));
    }
    catch (error) {
      throw (error);
    }
  };
}

export const logoutuserSuccess = (data: any) => {
  return {
    type: "LOGOUT_USER_ASYN",
    payload: {}
  }
}