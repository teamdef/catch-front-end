import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  a {
    position: absolute;
    display: block;
    top: 22px;
    left: 2%;
    z-index: 99;
  }
`;

interface QuizInfoProps {
  thumbnail?: string;
}
// 퀴즈 카드 타이틀 컨테이너
export const QuizTitleContainer = styled.div<QuizInfoProps>`
  position: relative;
  display: block;
  height: 35%;
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
    /* Two values, one per background */

    background: ${(props) => (props.thumbnail ? css`url(${props.thumbnail})` : 'none')} center;
    background-blend-mode: multiply;
    background-color: #888;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const QuizTitle = styled.h1`
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  line-height: 120%;
  /* identical to box height, or 42px */
  letter-spacing: -0.02em;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  @media (max-width: 390px) {
    font-size: 2rem;
  }
  /* 나중에 500px 이하로 내려가면 vw 에 따라 조절 */
  word-break: keep-all;
  text-align: center;
  color: #fff;
  z-index: 1;
`;
// // 퀴즈카트 타이틀 컨테이너

export const InnerContainer = styled.div`
  position: relative;
  top: -37px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QuizMakerImage = styled.img`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #fff;
`;
export const QuizMakerName = styled.div`
  margin-top: 1.25vh;
  font-weight: 500;
  color: #888;
  font-size: 0.875rem;
  line-height: 20px;
`;
export const Description = styled.div`
  color: #595959;
  margin-top: 5vh;
  font-size: 14px;
  line-height: 160%;
  max-height: 88px;
  /*line-height: 1.5rem;*/
  text-align: center;
  word-break: keep-all;
  width: 60%;
`;
export const QuizCountContainer = styled.div`
  position: relative;
  font-size: 0.875rem;
  margin-top: 2.5vh;
  padding: 17px 0;
  color: #888;
  strong {
    margin-right: 4px;
    font-size: 1.3rem;
    font-weight: bold;
    color: #ff264d;
  }
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 145%;
    height: 2px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff4d57;
  }
`;

export const ButtonWrap = styled.div`
  position: relative;
  display: flex;
  margin-top: 5vh;
  button {
    position: relative;
    height: auto;
    padding: 20px 100px;
    span {
      position: relative;
      display: block;
      font-weight: 700;
      font-size: 19px;
      line-height: 28px;
    }
    border-radius: 16px;
  }
`;

export const SNSShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
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

