import axios from 'axios';

const BACKEND_PORT_NUMBER = '5001';
const SERVER_URL = `http://${window.location.hostname}:${BACKEND_PORT_NUMBER}`;

export const getApi = (endpoint: string) => axios.get(`${SERVER_URL}/${endpoint}`);
