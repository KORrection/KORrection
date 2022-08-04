import axios from 'axios';

import { SERVER_URL } from 'constants/index';

export const getApi = (endpoint: string, config?: object) =>
  axios.get(`${SERVER_URL}/${endpoint}`, {
    ...config,
    withCredentials: true,
  });

export const postApi = (endpoint: string, data: object, config?: object) => {
  const bodyData = JSON.stringify(data);

  return axios.post(`${SERVER_URL}/${endpoint}`, bodyData, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

export const formPostApi = (endpoint: string, data: FormData, config?: object) => {
  const bodyData = data;

  return axios.post(`${SERVER_URL}/${endpoint}`, bodyData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
};

export const deleteApi = (endpoint: string, config?: object) =>
  axios.delete(`${SERVER_URL}/${endpoint}`, {
    ...config,
    withCredentials: true,
  });

export const putApi = (endpoint: string, data?: object, config?: object) => {
  const bodyData = JSON.stringify(data);

  return axios.put(`${SERVER_URL}/${endpoint}`, bodyData, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};
