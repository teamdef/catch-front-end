import styled, { keyframes } from 'styled-components';

export const bounce = keyframes` 
  0% {transform: translatey(0px);}
  5% {transform: translatey(-10px);}
  10% {transform: translatey(0px);}
  100% {transform: translatey(0px);}
`;


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;
 export const MainContainer = styled.div`
  background-color: white;
  border-radius: 30px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.div`
  span {
    position: relative;
    display: inline-block;
    animation: ${bounce} 2s linear 0.1s infinite;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
    &:nth-child(4) {
      animation-delay: 0.4s;
    }
  }
  font-family: 'RixInooAriDuriR';
  font-size: 3.5rem;
  color: #ff4d57;
  padding: 1rem 0 1rem 0;
  margin-bottom: 10%;
`;
export const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  line-height:1.3rem;
  margin-bottom: 20%;
  color:#595959;;
  strong {
    color: #ff4d57;
  }
`;
export const KakaoLoginBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  border-radius: 30px;
  height: 50px;
  background-color: #fbe54d;
  border: none;
  margin-bottom: 20%;
  &:hover {
    cursor: pointer;
  }
  & img {
    position: relative;
    width: 18px;
    height: 17px;
    margin-right: 20px;
  }
  & span {
    font-weight: bold;
    color: #391c1c;
  }
`;
