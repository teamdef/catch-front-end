import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle` 
  ${reset}
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;
    font-family: 'NanumSquare'; // 기본 베이스 폰트 변경

    scroll-behavior: smooth;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */


    font-size: ${({ theme }) => theme.fontSize.body_2};
    font-weight:${({ theme }) => theme.fontWeight.regular};
    line-height: 1.5; /* 줄간격 150% */
    letter-spacing:-2%; /* 자간 조정 */
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
    outline-style: none;
  }
  button {
    border: 0;
    cursor:pointer;
  }
`;

export default GlobalStyle;
