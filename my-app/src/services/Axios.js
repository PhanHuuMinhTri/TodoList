import axios from "axios";

const createAxios = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return instance;
};

export default createAxios;
