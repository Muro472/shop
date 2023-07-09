import axios, { InternalAxiosRequestConfig } from 'axios';

const appRequestSuccessInterceptor = (config: InternalAxiosRequestConfig) => {
  return config;
};

const http = axios.create({
  baseURL: 'http://16.170.235.178:8080/api',
  timeout: 50000,
});

http.interceptors.response.use((response) => response);

http.interceptors.request.use(appRequestSuccessInterceptor);

export { http };
