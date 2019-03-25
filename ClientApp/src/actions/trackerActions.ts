import axios from 'axios';
const apiUrl = '/api/';    

export const trackerList = () =>{
 return async (dispatch  :any) =>{
   try{
     //We are logged in the API so we don't need to pass again the userId
     const res = await axios.get<any>(apiUrl + "MyDevice/GetDeviceList/");
     return dispatch(trackerListSuccess(res.data));
   }
   catch (error) {
     throw (error)
   }
 }
}

export const trackerListSuccess = (data :any) => {
 return {
   type: "TRACKER_LIST",
   payload: data
 }
}