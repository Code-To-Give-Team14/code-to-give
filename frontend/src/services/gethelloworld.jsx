import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/";

export const getHelloWorld = () => { return axios.get(REST_API_BASE_URL); }
