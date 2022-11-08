import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios(){
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}


export const filterCourse = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    const { data } = await API.get("/course" + payload);
    // const {data} = await API.get("/course?language=All&courseType=Spoken Languages&startPrice=14&endPrice=200&country=Afghanistan&page=1&limit=10")
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const getStudentData  = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

     console.log(payload, 'payload')
    const { data } = await API.post("/student/myDetails", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const updateStudentProfile = payload => async dispatch => {
  try {
    let API = createAxios()

    const { data } = await API.post('student/updateProfile', payload)
    return data
  } catch (e) {
    console.log(e)
    return e.response.message
  }
}


export const bookSlot = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.post("/student/bookslot",payload);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const makePayment = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.post("/student/payment/razorpay");
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};