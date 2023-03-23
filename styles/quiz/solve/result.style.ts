import styled from 'styled-components';

export const Container = styled.div`
  position: block;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  margin-top:40px;
`;

export const QuizResultCard = styled.div`
  border-radius: 16px;
  border: solid 1px #ffa5aa;
  padding: 0 3%;
  padding:40px 6%;

`;
export const RankingBoardWrapper = styled.div` 
  margin-top:40px;
  h3{
    color:#424242;
    font-weight:800;
    font-size:1.2rem;
    margin-bottom:14px;
  }
`
export const ScoreContainer = styled.div`
  display: block;
  width: 100%;
  border-radius: 30px;
  color: #424242;
  flex-grow: 1;
  margin-bottom:40px;
  p {
    word-break: keep-all;
    font-size: 1.4rem;
    .nickname {
      color: #212121;
      font-weight: 900;
      font-size: 1.7rem;
    }
    b {
      color: #ff4d57;
      font-weight: 800;
    }
  }
`;


export const SNSShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:60px;
  #explain {
    color: #888;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    svg {
      margin-right: 4px;
    }
  }
`;


export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 137px;
    height: 40px;
    border-radius: 8px;
  }
`;
