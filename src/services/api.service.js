import axios from "./axios.customize";
import { API_URL } from "../constants/api.constant";

const createUserAPI = (data) => {
  return axios.post(API_URL.CREATE_USER, data);
};

export {createUserAPI}