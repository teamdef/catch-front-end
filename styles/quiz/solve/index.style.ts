import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;
interface QuizInfoProps {
  thumbnail?: string;
}
// 퀴즈 카드 타이틀 컨테이너
export const QuizTitleContainer = styled.div<QuizInfoProps>`
  position: relative;
  display: block;
  height: 40%;
  flex: none;
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
  position: relative;
  margin-top: 56px;
  color: #000;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 150%; /* 27px */
  letter-spacing: -0.9px;
`;
export const Description = styled.div`
  color: ${({ theme }) => theme.colors.blackColors.grey_700};
  text-align: center;
  font-family: NanumSquare;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.7px;
`;
export const InnerContainer = styled.div`
  position: relative;
  top: -37px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10%;
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
