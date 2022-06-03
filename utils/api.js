import axios from "axios";
import nookies from "nookies";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = nookies.get().token;
    if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
    }
    // console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default api;
