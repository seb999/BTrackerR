import axios from 'axios';
const apiUrl = '/api/Account';    
import { Dispatch } from 'redux'   

interface payLoad {
  type :string;
  paylaod : any;
}



export const logUser = (user: User) => {
  return{
    type: "LOG_USER",
    payload : user
  }
};

export const logUserAsyn = (user: User) => {  
    // return (dispatch : any) => {
    //    let loginViewModel = {Email : user.userLogin, Password : user.userPassword, RememberMe : user.rememberMe, Result:false, UserId:""}
    
    //    return axios.post<any>(apiUrl + "/LoginFromClient/", loginViewModel).then(res =>{
    //       return dispatch(loguserSuccess(res.data))
    //     })
    //     .catch(error => {
    //       throw(error);
    //     });
    // };

    return {
      type: "LOG_USER_ASYN",
      payload: user
    }

    // return (p : any) => 
    // {
    //   // setTimeout(() => {
    //   //    p({
    //   //     type: "LOG_USER_ASYN",
    //   //     payload: 1234
    //   //   })
    //   // }, 3000)
    // }
  };
  
  export const loguserSuccess = (data : any) => {
    return {
      type: "LOG_USER_ASYN",
      payload: data
    }
  };