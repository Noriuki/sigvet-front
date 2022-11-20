import axios from "axios";
import { getCurrentUser } from "../Auth";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
const authHeader = () => {
  if (getCurrentUser()) {
    return { Authorization: `Bearer ${getCurrentUser()?.token}` };
  }
  return {};
};
export const createRequest = async (_url: string, data: any): Promise<any> => {
  const reqRes = await apiService.post(`${_url}`, data, {
    headers: authHeader(),
  });
  return reqRes?.data;
};

export const getAllRequest = async (_url: string, id: number): Promise<any> => {
  const reqRes = await apiService.get(`${_url}/all/${id}`, {
    headers: authHeader(),
  });

  return reqRes?.data;
};

export const getRequest = async (_url: string, id: number): Promise<any> => {
  const reqRes = await apiService.get(`${_url}/${id}`, {
    headers: authHeader(),
  });
  return reqRes?.data;
};

export const deleteRequest = async (_url: string, id: number): Promise<any> => {
  const reqRes = await apiService.delete(`${_url}/${id}`, {
    headers: authHeader(),
  });
  return reqRes?.data;
};

export const updateRequest = async (
  _url: string,
  id: number,
  data: any
): Promise<any> => {
  const reqRes = await apiService.put(`${_url}/${id}`, data, {
    headers: authHeader(),
  });
  return reqRes?.data;
};

export default apiService;
