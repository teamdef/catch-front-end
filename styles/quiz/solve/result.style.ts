import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  margin-top: 40px;
`;

export const QuizResultCard = styled.div`
  border-radius: 16px;
  border: solid 1px #ffa5aa;
  padding: 0 3%;
  padding: 40px 0;
  margin-bottom: 30px;
`;
export const RankingBoardWrapper = styled.div`
  h3 {
    padding: 0 6.75%;
    color: #424242;
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 14px;
  }
  > ul {
    padding: 0 6%;
  }
`;
export const ScoreContainer = styled.div`
  display: block;
  width: 100%;
  padding: 0 6%;
  border-radius: 30px;
  color: #424242;
  flex-grow: 1;
  margin-bottom: 40px;
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 5%;
  button {
    width: 137px;
    height: 40px;
    border-radius: 8px;
    font-size: 1rem;
  }
`;
export const ErrorWrapper = styled.div`
padding-bottom: 40px;
`;