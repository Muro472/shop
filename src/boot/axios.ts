import axios, { InternalAxiosRequestConfig } from 'axios';

const appRequestSuccessInterceptor = (config: InternalAxiosRequestConfig) => {
  return config;
};

const http = axios.create({
  baseURL: 'http://localhost:8080/api',
  // baseURL: 'https://16.170.235.178.nip.io/api',

  timeout: 50000,
});

http.interceptors.response.use((response) => response);

http.interceptors.request.use(appRequestSuccessInterceptor);

export { http };
