import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie, saveToken, deleteToken } from 'utils/token';

// https://velog.io/@dkdlel102/React-CORS-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
const authAxios: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_BACKEND : process.env.NEXT_PUBLIC_DEPLOY_BACKEND,
  timeout: 100000000,
  headers: { 'Content-Type': 'application/json' },
});

authAxios.defaults.withCredentials = false;
const notAuthAxios: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_BACKEND : process.env.NEXT_PUBLIC_DEPLOY_BACKEND,
  timeout: 100000000,
  headers: { 'Content-Type': 'application/json' },
});

notAuthAxios.defaults.withCredentials = false;

/* 
  http가 request를 보내기 전에 호출되는 함수이다.
  cookie에 저장된 access_token을 인증 헤더에 삽입하여 요청마다 보내준다.
*/
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const access_token = getCookie('access_token');
  /* 토큰이 있을 경우 헤더에 삽입한다. 없을 경우 빈 문자열을 넣는다(null은 안됨) */
  config.headers = {
    Authorization: !!access_token ? `Bearer ${access_token}` : '',
  };
  return config;
};
const onErrorRequest = (err: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(err);
};
authAxios.interceptors.request.use(onRequest, onErrorRequest);

/* 
  http가 response를 보내기 전에 가로채어 응답값을 검증한다. 
  access_token이 만료되었을 때 cookie에 저장된 refresh_token를 검증하여 access_token을 재요청한다.
*/

/* http response가 then으로 넘어가기 전에 호출되는 함수이다. */
const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
};

/* http response가 catch로 넘어가기 전에 호출되는 함수이다.*/
const onErrorResponse = async (err: AxiosError | Error): Promise<AxiosError> => {
  const _err = err as unknown as AxiosError; // err 객체의 타입은 unknown이므로 타입 단언을 해주어야 한다
  const { response } = _err; // err 객체에서 response 를 구조 분해 할당
  const originalConfig = _err?.config; // 기존의 요청 정보를 저장한다.

  if (response && response.status === 403) {
    const access_token = getCookie('access_token'); // 현재 만료된 access token;
    const refresh_token = getCookie('refresh_token'); // 리프레시 토큰이 있을 경우 가져온다.
    if (!!refresh_token === false) {
      // refresh token이 쿠키에서 삭제 또는 만료 되었을 경우
      alert('세션이 만료되어 로그아웃 되었습니다.');
      deleteToken();
      window.location.href = '/'; // next/router 사용이 안되므로 window location으로 화면 전환
    } else {
      try {
        // 만료된 access token과 refresh token을 이용해 리프레시api에 갱신 요청
        const res = await notAuthAxios.put(
          `/refresh`,
          {}, // 백엔드에서 빈 객체 body를 받을 수 있도록 수정 요청
          { headers: { Refresh: `Bearer ${refresh_token}`, Authorization: `Bearer ${access_token}` } },
        );
        if (res) {
          const _newAccessToken = res?.data?.newAccessToken;
          // 응답값이 있을 경우 새로 발급 받은 토큰을 저장한다.
          await saveToken(_newAccessToken); // 토큰을 쿠키에 저장 비동기 함수
          return await authAxios.request(originalConfig);
        }
      } catch (err) {
        const _err = err as unknown as AxiosError;
        console.log(_err?.response?.status);
        if (_err?.response?.status === 401) {
          alert('세션이 만료되어 로그아웃 되었습니다.');
          deleteToken();
          window.location.href = '/'; // next/router 사용이 안되므로 window location으로 화면 전환
          // 토큰 쿠키 삭제 
        }
      }
    }
  }
  return Promise.reject(err);
};

authAxios.interceptors.response.use(onResponse, onErrorResponse);


export { authAxios, notAuthAxios };
