import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios(){
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/teacher`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}


export const getTeacherData  = (payload) => async (dispatch) => {
  try {
    let API = createAxios()
    // console.log(payload, 'payload')
    const { data } = await API.get("/detail");
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const updateTeacherProfile = (payload) => async(dispatch)=>{
  try {
    let API = createAxios()

    const { data } = await API.post("/updateProfile", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
}

export const updateCourse = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.post("/updateCourse", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};


export const addAvailability = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    console.log(payload, "payload");
    const { data } = await API.post("/addAvailability", payload);
    console.log(data, "DaTA");
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const editAvailability = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    console.log(payload, "payload");
    const { data } = await API.post("/editAvailability", payload);
    console.log(data, "DaTA");
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};