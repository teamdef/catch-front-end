import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from 'utils/token';
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

// cookie에 저장된 access_token을 요청 마다 보내주기 
authAxios.interceptors.request.use(function (config: AxiosRequestConfig) {
  // 쿠키에 저장된 토큰 불러오기
  const access_token = getCookie('access_token');
  console.log('토큰 삽입 확인됨', access_token);

  // access_token 값이 null일 경우
  if (!!access_token) {
    // delete authAxios.defaults.headers.common['Authorization']; // axios 요청 헤더에서 token정보 삭제
   config.headers['Authorization'] = null;
    return config;
  }
  /* 쿠키에 토큰이 저장되어 있다면 ?? */
  if (config.headers && access_token) {
    // authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    config.headers['Authorization'] = `Bearer ${access_token}`;
    return config;
  }

  /* 쿠키에 토큰이 저장되어 있다면 ?? */
});

//AccessToken이 만료됐을때 처리
authAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;

    if (err.response && err.response.status === 401) {
      const refreshToken = originalConfig.headers['refreshToken'];
      try {
         /* 토큰 리프레시를 요청 할 url */ 
        const data = await axios({
          url: `refreshtoken담아 보낼 URL`,
          method: 'GET',
          headers: {
            Authorization: refreshToken,
          },
        });
        if (data) {
           /* 새로 발급 받은 토큰 저장 */
          localStorage.setItem('token', JSON.stringify(data.data, ['accessToken', 'refreshToken']));
          return await authAxios.request(originalConfig);
        }
      } catch (err) {
        console.log('토큰 갱신 에러');
        /* 리프레시 토큰 만료 시 (401) 로그아웃 처리 */
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);
export { authAxios, notAuthAxios };

