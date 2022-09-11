import axios from "axios";

const client = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_ROUTES = ["userLogin", "adminLogin", "register", "check-username"];

client.interceptors.request.use(
  (request) => {
    const authRoutes = AUTH_ROUTES.some(i => request.url.includes(i));
    if (!authRoutes) {
      const response = localStorage.getItem("token")
      const tokenJson = JSON.parse(response)
      request.headers.Authorization = `Bearer ${tokenJson.token}`;
    }
    return request;
  },
  (error) => {

    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    if (response.data.error) {
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    if (error.response?.status === 401) {
      //
    }
    return Promise.reject(error.response?.data);
  },
);

export default client;
