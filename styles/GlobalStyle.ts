import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle` 
  ${reset}
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;
    font-family: 'NanumSquare'; // 기본 베이스 폰트 변경

    scroll-behavior: smooth;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    /* 텍스트 드래그 방지 input 드래그는 작동함 . */
    /* -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; */

    font-size: 14px; /* 1rem 기준을 14px로 고정 */

    line-height: 1.6; /* 줄간격 160% */
  }   
  input [type='text']{
  -webkit-appearance: none; /* Safari input 그림자 제거 */
  border-radius:0;
  -webkit-border-radius: 0; /* Safari input 둥근 모서리 제거 */
  }

  body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }    
  
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;
