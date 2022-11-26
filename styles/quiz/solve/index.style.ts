import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;
export const Logo = styled.div`
  position: absolute;
  top: 0;
  display: block;
  z-index: 9999;
  font-size: 1.5rem;
  padding: 5% 0 0 5%;
  font-family: 'RixInooAriDuriR';
  color: #ff4d57;
`;
export const QuizInfo = styled.div`
  position: relative;
  display: block;
  height: 70%;
  overflow: hidden;
  border-radius: 0 0 30px 30px;
  span {
    position: relative;
  }
`;
export const BgImg = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  height: 100%;
`;
export const InfoTxt = styled.div`
  position: absolute;
  padding: 7% 5%;
  display: flex;
  justify-content: end;
  flex-direction: column;
  width: 100%;
  height: 80%;
  bottom: 0;
  color: #fff;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0) 0%,
    rgba(20, 20, 20, 0.2) 26.56%,
    rgba(20, 20, 20, 0.3) 52.6%,
    rgba(20, 20, 20, 0.4) 78.65%,
    rgba(20, 20, 20, 0.6) 100%
  );

  p {
    margin: 5% 0 2% 0;
    em {
      color: #ff4d57;
      font-style: normal;
    }
  }
  span {
    font-size: 0.8rem;
    color: #ccc;
  }
`;
export const InfoTitle = styled.div`
  h1 {
    position: relative;
    display: inline-block;
    font-size: 1.5rem;
    margin: 0;
    padding-bottom: 5%;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      display: inline-block;
      width: 150%;
      height: 1px;
      background-color: #c9c9c98f;
    }
  }
`;
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
export const Bubbling = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  img {
    width: 60%;
  }
`;
