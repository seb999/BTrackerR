import axios from 'axios';
const apiUrl = '/api/MyDevice/';    

export const trackerList = () =>{
 return async (dispatch  :any) =>{
   try{
     //We are logged in the API so we don't need to pass again the userId
     const res = await axios.get<any>(apiUrl + "GetDeviceList/");
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

export const saveNewTracker = (data :any) =>{
  return async (dispatch  :any) =>{
    let device = {DeviceEUI : data.deviceEui, DeviceDescription : data.deviceDescription}
    try{
      const res = await axios.post<any>(apiUrl + "SaveDevice/", device);
      return dispatch(trackerSavedSuccess(res.data));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const trackerSavedSuccess = (data :any) => {
  return {
    type: "TRACKER_SAVED",
    payload: data
  }
 }