import axios from "./axios.customize";
import { API_URL } from "../constants/api.constant";

const createUserAPI = (data) => {
  return axios.post(API_URL.CREATE_USER, data);
};

const getAllUserAPI = () => {
  return axios.get(API_URL.GET_ALL_USER);
};

const updateUserAPI = (data) => {
  return axios.put(API_URL.UPDATE_USER, data);
}

const deleteUserAPI = (id) => {
  return axios.delete(`${API_URL.DELETE_USER}/${id}`);
};

export { createUserAPI, getAllUserAPI, updateUserAPI, deleteUserAPI };