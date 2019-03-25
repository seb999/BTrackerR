import axios from 'axios';
const apiUrl = '/api/';    

export const logUserAsyn = (user: any) => {
 return async (dispatch : any) => {
    let loginViewModel = {Email : user.userLogin, Password : user.userPassword, RememberMe : user.rememberMe, Result:false, UserId:""}

    try {
     const res = await axios.post<any>(apiUrl + "Account/LoginFromClient/", loginViewModel);
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

export const logoutUserAsyn = () => {
 return async (dispatch : any) => {
    try {
     const res = await axios.get<any>(apiUrl + "Account/Logout/");
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