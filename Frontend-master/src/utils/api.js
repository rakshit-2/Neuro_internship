// export const baseURL = "https://neurolinguain.herokuapp.com";
// export const baseURL = "http://localhost:8080/api";
// export const baseURL = "http://localhost:8080";
// export const baseURL = "http://ec2-15-206-205-117.ap-south-1.compute.amazonaws.com:8080";
export const baseURL = "http://neurolingua.in:8080";
//export const baseURL = "http://localhost:8080";

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return config;
};

