import styled,{css} from 'styled-components';

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


const SectionTitleMixin = css`
  margin-top:20px;
  padding:0 3%;
  .section-title{
    font-size:1.2rem;
    font-weight:500;
    color:#212121;
  }
  .section-description{
    color:#616161;
    font-size:0.85rem;
  }
  .section-count{
    font-size:1.1rem;
    font-weight:500;
    color:#424242;
    margin-left:8px;
  }
  .margin-bottom-20{
    margin-bottom:20px;
  }
`;


export const QuizResultSection = styled.div` 
    ${SectionTitleMixin}
    margin-bottom:40px;
`

export const CommentSection = styled.div` 
    ${SectionTitleMixin}
`
export const PopularQuizSection = styled.div` 
    ${SectionTitleMixin}
`

export const Divider = styled.div` 
  background-color:#f5f5f5;
  width:100%;
  height:8px;
`

export const ScoreContainer = styled.div`
  padding:0 3% 0 6%;
  display:flex;
  justify-content:space-between;
  width:100%;
  >div{
    display: block;
    width: 100%;
    color: #424242;
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
  }
  .go-match-note{
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    color:#FE747B;
    font-size:1rem;
    width:100px;
  }
`;

export const RankingContainer = styled.div`
    padding:0 6%;
`
export const EmotionShareContainer = styled.div` 
      padding:0 6%;
`
