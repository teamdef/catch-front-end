import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  a {
    position: absolute;
    display: block;
    top: 24px;
    left: 3%;
    z-index: 99;
  }
`;

interface QuizInfoProps {
  thumbnail?: string;
}
export const QuizInfo = styled.div<QuizInfoProps>`
  position: relative;
  display: block;
  height: 300px;
  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 100vw;
    height: 100%;
    max-width: 480px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: ${(props) =>
        props.thumbnail
          ? css`linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 70%,
      rgba(255, 255, 255, .2) 75%,
      rgba(255, 255, 255, .9) 90%,
      rgba(255, 255, 255, 1) 100%
    ),
    url(${props.thumbnail})`
          : 'none'}
      center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const QuizTitle = styled.h1`
position: relative;
  padding-top: 80px;
  margin: 0 auto;
  max-width: 390px;
  font-family: RixInooAriDuriR;
  font-size: 60px;
  line-height: 1.1;
  z-index: 1;
  @media (max-width: 390px) {
    max-width: 90%;
    font-size: 14vw;
  }
  /* 나중에 500px 이하로 내려가면 vw 에 따라 조절 */
  word-break: keep-all;
  text-align: center;
  color: #fff6f7;
  -webkit-text-stroke: 3px #ff4d57;
  text-shadow: #ff4d57 1px 1px, #ff4d57 0px 0px, #ff4d57 1px 1px, #ff4d57 2px 2px, #ff4d57 3px 3px, #ff4d57 4px 4px,
    #ff4d57 5px 5px, #ff4d57 6px 6px, #ff4d57 7px 7px;
`;

export const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

export const Description = styled.div`
  color: #595959;
  font-size: 1rem;
  /*line-height: 1.5rem;*/
  text-align: center;
  width: 90%;
`;
export const QuizMakerBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
  background-color: #fff6f7;
  border-radius: 12px;
  font-size: 1rem;
  span {
    font-size: 0.75rem;
  }
  #maker {
    margin-top: 4px;
    font-weight: bold;
    color: #ff264d;
  }
`;
export const QuizInfoContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
  height: 80px;
  width: 100%;
  color: #888;
  > div {
    width: 30%;
  }
  #block {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff6f7;
    border-radius: 12px;
    font-size: 1rem;
  }
  strong {
    margin-right: 4px;
    font-size: 1.75rem;
    font-weight: bold;
    color: #ff264d;
  }
`;

export const SNSShareContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  #explain {
    color: #888;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    svg {
      margin-right: 4px;
    }
  }
`;

export const BestCommentContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  #title {
    color: #ff4d57;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }
`;
export const ButtonWrap = styled.div`
  position: fixed;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  width: 100%;
  max-width: 480px;
  button {
    position: relative;
    display: flex;
    margin: 0 3%;
  }
`;
