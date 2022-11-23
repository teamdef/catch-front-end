import styled from 'styled-components';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { Button,Logo } from 'components/common';
const MatchNote = ({ setOpenMatch }: any) => {
  const { solveAnswers } = useSelector((state: RootState) => state.solve);
  return (
    <MatchEl>
      <Logo />
      <h1>오답노트📝</h1>
      {solveAnswers.map((item: any, index: number) => {
        if (item != undefined) {
          return (
            <MatchCard key={index}>
              <h2>
                <span style={{ fontWeight: 'normal' }}>
                  {index + 1}. {item.title}
                </span>
              </h2>
              {item.correct_answer.includes('catchmeimages') ? (
                <MatchImg>
                  <div className='my-img'>
                    <span>내가 고른 답</span>
                    <img src={item.user_answer} />
                  </div>
                  <div className='correct-img'>
                    <span >정답</span>
                    <img src={item.correct_answer} />
                  </div>
                </MatchImg>
              ) : (
                <MatchTxt>
                  <span className='my-txt'>
                    내가 고른 답 : {item.user_answer}
                  </span>
                  <span className='correct-txt'>
                    정답 : {item.correct_answer}
                  </span>
                </MatchTxt>
              )}
            </MatchCard>
          );
        }
      })}
      <Button width="30%" height="50px" bgColor="#ff4d57" fontColor="#fff" onClick={() => setOpenMatch(false)}>
        닫기
      </Button>
    </MatchEl>
  );
};

const MatchEl = styled.div`
  position: absolute;
  top: 0;
  display: block;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  padding: 0 5%;
  padding-top: 65px;
  h1 {
    margin: 0;
    color: #ff4d57;
    text-align: center;
    font-size: 1.6rem;
  }
  button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }
`;
const MatchCard = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 20%;
  flex-direction: column;
  > div {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  h2 {
    position: relative;
    margin-top: 10%;
    margin-bottom: 5%;
    span {
      position: relative;
      display:block;
      width: 80%;
      padding: 12px 20px;
      font-weight: normal;
      border-radius: 0px 20px 20px 20px;
      background-color: #ff4d57;
      font-size: .9rem;
      color: #fff;

    }
  }
`;

const MatchImg = styled.div`
  position:relative;
  display:flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
  div {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-items: top;
    align-items: center;
    padding: 10px 0;
    border-radius: 20px 0px 20px 20px;
    span {
      margin-bottom: 5px;
    }
    &.my-img {
      background-color: #FFEFEF;
      color: #FF4D57;
    }
    &.correct-img {
      background-color: #AAD775;
      color: #fff;
    }
    img {
      display: block;
      width: 70%;
      border-radius: 20px;
    }
  }
`;
const MatchTxt = styled.div`
  flex-direction: column;
  align-items: end;
  gap: 10px;
  span {
    padding: 12px 20px;
    border-radius: 20px 0px 20px 20px;
    font-size: .9rem;
    &.my-txt {
      background-color: #FFEFEF;
      color: #FF4D57;
    }
    &.correct-txt {
      background-color: #AAD775;
      color: #fff;
    }
  }
`;
export default MatchNote;
