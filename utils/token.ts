import { authAxios } from 'pages/api/customAxios';
import Cookies from 'universal-cookie';
// react-cookies는 범용성이 낮음. react-cookie 업그레이드 버전인 universal-cookie
const HTTP_ONLY = process.env.NODE_ENV !== 'development';

// 서버로 부터 accessToken을 받아서 cookie에 저장
// 보안 문제로 인해 httponly 설정 필요

const saveToken = (accessToken: string): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    // 모든 axios 요청 헤더에 token정보를 저장해야 함
    authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

    const cookies = new Cookies(); // 쿠키 생성

    const expires_time = new Date();
    expires_time.setDate(Date.now() + 1000 * 60 * 60 * 3); // 만료 시간 3시간

    const max_age = 60*60*3; // 만료 시간 3시간
    cookies.set('access_token', accessToken, {
      path: '/', // 쿠키에 접근할 수 있는 경로
      httpOnly: false, // document.cookie와 같이 자바스크립트에서 쿠키에 접근하는 것을 방지
      expires: expires_time, // 쿠키 만료 시점
      maxAge: max_age, // 쿠키 유효 기간
      // domain: process.env.NODE_ENV === 'development' ? undefined : '.catchcatch.link',
      // sameSite: process.env.NODE_ENV === 'development' ? undefined : 'none', // 웹 애플리케이션에서 CSRF(교차 사이트 요청 위조)공격을 방지하기 위해 */
      // secure: process.env.NODE_ENV === 'development' ? false : true, // https로 통신할 때만 쿠키가 저장된다
    });
    resolve(true);
  });

const deleteToken = () => {
  delete authAxios.defaults.headers.common['Authorization']; // axios 요청 헤더에서 token정보 삭제
  const cookies = new Cookies(); // 쿠키 생성
  const delete_time = new Date();
  delete_time.setDate(Date.now() - 1); // 현재 이전의 날짜로 만료일자를 설정하면 쿠키가 바로 만료된다.

  cookies.remove('access_token');

  cookies.set('access_token', '', {
    path: '/',
    httpOnly: HTTP_ONLY,
    maxAge: 0,
  });
};

const getCookie = (name: string) => {
  const cookies = new Cookies(); // 쿠키 생성
  return cookies.get(name);
};

export { saveToken, deleteToken, getCookie };
