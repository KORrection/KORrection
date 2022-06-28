import axios from 'axios';

const BACKEND_PORT_NUMBER = '5001';
const SERVER_URL = `http://${window.location.hostname}:${BACKEND_PORT_NUMBER}`;

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

export const deleteApi = (endpoint: string) =>
  axios.delete(`${SERVER_URL}/${endpoint}`, {
    withCredentials: true,
  });

export const putApi = (endpoint: string, data?: object) => {
  const bodyData = JSON.stringify(data);

  return axios.put(`${SERVER_URL}/${endpoint}`, bodyData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};
