import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// https://velog.io/@dkdlel102/React-CORS-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
const authAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_BACKEND : process.env.NEXT_PUBLIC_DEPLOY_BACKEND,
  timeout: 100000000,
  headers: { 'Content-Type': 'application/json' },
});

authAxios.defaults.withCredentials = false;
const notAuthAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_BACKEND : process.env.NEXT_PUBLIC_DEPLOY_BACKEND,
  timeout: 100000000,
  headers: { 'Content-Type': 'application/json' },
});

notAuthAxios.defaults.withCredentials = false;

export { authAxios, notAuthAxios };

