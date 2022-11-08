import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios(){
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/course`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

// console.log(token.access)

export const createCourse = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    console.log(payload, "payload");
    const { data } = await API.post("/createCourse", payload);
    console.log(data, "DaTA");
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const getMyCourses = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.get("/getCourseByTeacher", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

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

export const deleteCourse = (payload)=>async(dispatch)=>{
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.post("/deleteCourse", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const getCourseData = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.get("/courseData?courseId=61daca14245835d2f54d4b58");
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

