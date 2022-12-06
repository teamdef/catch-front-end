import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  a {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    padding: 5%;
    z-index: 99;
  }
`;

interface QuizInfoProps {
  thumbnail?: string;
}
export const QuizInfo = styled.div<QuizInfoProps>`
  position: relative;
  display: flex;
  justify-content: center;
  /* height: 80%; */
  height:600px;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background: ${(props) =>
      props.thumbnail
        ? css`linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 10%,
      rgba(255, 255, 255, 0.5) 25%,
      rgba(255, 255, 255, 0.7) 40%,
      rgba(255, 255, 255, 0.9) 50%,
      rgba(255, 255, 255, 1) 60%,
      rgba(255, 255, 255, 1) 70%,
      rgba(255, 255, 255, 1) 80%,
      rgba(255, 255, 255, 1) 90%,
      rgba(255, 255, 255, 1) 100%
    ),
    url(${props.thumbnail})`
        : 'none'}
    center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const QuizTitle = styled.h1`
  max-width: 400px;
  margin-top: 9rem;
  font-family: RixInooAriDuriR;
  font-size: 60px;
  @media (max-width: 400px) {
    max-width: 80%;
    font-size:50px;
  }
  line-height: 70px;
  /* 나중에 500px 이하로 내려가면 vw 에 따라 조절 */
  word-break: keep-all;
  text-align: center;
  color: #fff6f7;
  -webkit-text-stroke: 3px #ff4d57;
  text-shadow: #ff4d57 1px 1px, #ff4d57 0px 0px, #ff4d57 1px 1px, #ff4d57 2px 2px, #ff4d57 3px 3px, #ff4d57 4px 4px,
    #ff4d57 5px 5px, #ff4d57 6px 6px, #ff4d57 7px 7px;
`;

export const InnerContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 350px;
  padding-left: 2rem;
  padding-right: 2rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

export const Description = styled.div`
  color: #595959;
  line-height: 1.5rem;
  text-align: center;
  width: 90%;
`;
export const QuizMakerBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  color:#888;
  background-color: #fff6f7;
  border-radius: 12px;
  font-size: 16px;
  #maker {
    margin-top:4px;
    font-size: 20px;
    font-weight: bold;
    color: #ff264d;
  }
`;
export const QuizInfoContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100px;
  width: 100%;
  color: #888;
  #block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff6f7;
    border-radius: 12px;
    font-size: 18px;
  }
  strong {
    margin-right: 4px;
    font-size: 24px;
    font-weight: bold;
    color: #ff264d;
  }
`;

export const SNSShareContainer = styled.div`
  margin-top: 2rem;
  width: 75%;
  @media (max-width: 400px) {
    width: 90%;
  }
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
  margin-top: 2rem;
  width:100% ;
  #title {
    color: #ff4d57;
    font-size:18px;
    font-weight:bold;
    text-align:left;
  }
`;
export const ButtonWrap = styled.div`
/*
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  */
  width:100%;
  padding-top:2rem;
`;
