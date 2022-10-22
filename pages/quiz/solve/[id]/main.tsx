import { useState } from 'react';
import type { ReactElement } from 'react';
import styled from 'styled-components';
import { AppLayout } from 'components/layout';
import { Button, Loading } from 'components/common';
import type { NextPageWithLayout } from 'pages/_app';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveSolveAnswersAction, saveSolveUserScoreAction } from 'store/quiz_solve';
import { BiChevronRight } from 'react-icons/bi';
import SwipeAniIcon from 'components/common/SwipeAniIcon';
import { useModal } from 'hooks';
import Router from 'next/router';
import NickNameModal from 'components/modal/NickNameModal';

// swiper
import { Pagination, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const Page: NextPageWithLayout = () => {
  const [choice, setChoice] = useState<Boolean>(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { solveSetTitle, solveProblems } = useSelector((state: RootState) => state.solve);
  const [loading, setLoading] = useState<Boolean>(false);
  // 유저가 고른 답 (빈문자열 혹은 꽉찬 배열 : state 로 인해 값이 초기화되는 것을 방지)
  let answers: string[] = userAnswers;

  // 오답노트
  let matchList = solveProblems.map((prob: any, index: number) => {
    // 정답(correct_choice)의 id 와 일치하는 항목을 찾아내서 정답지 배열을 생성
    let result = prob.choices.find((choice: any) => {
      return choice.id === prob.correct_choice;
    });
    // result : id 와 cho_txt||cho_img 를 가진 object
    if (result.cho_txt != userAnswers[index] && result.cho_txt != null) {
      return { title: prob.prob_title, user_answer: userAnswers[index], correct_answer: result.cho_txt };
    } else if (result.cho_img != userAnswers[index] && result.cho_img != null) {
      return { title: prob.prob_title, user_answer: userAnswers[index], correct_answer: result.cho_img };
    }
  });

  const onChange = () => {
    /* 사용자가 선택한 답의 배열 내 빈 값(선택하지 않음)을 찾고 빈 값이 없을 경우(false) + 유저가 선택한 답의 갯수와 문제의 갯수가 일치할 경우 버튼 출력 */
    if (answers.filter((answer) => typeof answer != undefined).length == solveProblems.length) {
      setChoice(true);
      setUserAnswers(answers);
    }
  };

  const QuizList = solveProblems.map((item: any, i: number) => (
    <SwiperSlide key={i}>
      <QuizSolveCard>
        <CardTitle>{item.prob_title}</CardTitle>
        {item.is_img ? (
          <ChoiceWrapper id="choice-img-wrapper">
            {item.choices.map((_choice: any, j: number) => (
              <ChoiceItem key={j} className="choice-item" id="choice-img-item">
                <input
                  type="radio"
                  id={_choice.id}
                  name={`choice_${i}`}
                  value={_choice.cho_img}
                  onChange={() => {
                    answers[i] = _choice.cho_img;
                    onChange();
                  }}
                />
                <label htmlFor={_choice.id}>
                  <img src={_choice.cho_img} />
                </label>
              </ChoiceItem>
            ))}
          </ChoiceWrapper>
        ) : (
          <ChoiceWrapper>
            {item.choices.map((_choice: any, j: number) => (
              <ChoiceItem key={j} className="choice-item" id="choice-item-txt">
                <input
                  type="radio"
                  id={_choice.id}
                  name={`choice_${i}`}
                  value={_choice.cho_txt}
                  onChange={() => {
                    answers[i] = _choice.cho_txt;
                    onChange();
                  }}
                />
                <label htmlFor={_choice.id}>{_choice.cho_txt}</label>
              </ChoiceItem>
            ))}
          </ChoiceWrapper>
        )}
      </QuizSolveCard>
    </SwiperSlide>
  ));
  const [openModal, closeModal, RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NickNameModal setLoading={setLoading} />,
  });

  return (
    <Container>
      <Logo onClick={() => Router.push('/home')}>캐치캐치</Logo>
      <QuizSolveContent>
        <QuizTitle>{solveSetTitle}</QuizTitle>
        <Swiper spaceBetween={0} slidesPerView={1} pagination={true} modules={[Pagination, EffectFade]} effect="fade">
          {QuizList}
        </Swiper>
      </QuizSolveContent>
      <QuizSolveBottom>
        {choice ? (
          <Button
            fontColor="#fff"
            style={{ margin: '0 auto' }}
            width="50%"
            height="50px"
            bgColor="#ff4d57"
            onClick={() => {
              dispatch(saveSolveAnswersAction({ solveAnswers: matchList }));
              dispatch(
                saveSolveUserScoreAction({
                  solveUserScore: matchList.filter((element: any) => undefined === element).length,
                }),
              );
              console.log(matchList);
              openModal();
            }}
          >
            <span>결과 확인</span>
            <BiChevronRight size="35" />
          </Button>
        ) : (
          <SwipeAniIcon />
        )}
        <RenderModal />
        {loading ? <Loading ment="결과 출력 중 . . ." /> : ''}
      </QuizSolveBottom>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  background-color: #fff6f7;
  flex-direction: column;
  padding: 0 5%;
  padding-top: 10%;
  width: 100%;
  color: #555;
  height: 100vh;
`;
const Logo = styled.div`
  position: absolute;
  top: 0;
  display: block;
  font-size: 1.5rem;
  padding-top: 5%;
  font-family: 'RixInooAriDuriR';
  color: #ff4d57;
`;
const QuizTitle = styled.h1`
  text-align: center;
  font-weight: normal;
  font-size: 1.3rem;
`;
const QuizSolveContent = styled.div`
  @keyframes Bounce {
    0% {
      transform: translateY(-30px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes Right {
    0% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
  .swiper-wrapper {
    padding-top: 30px;
    padding-bottom: 10px;
  }
  .swiper-pagination {
    bottom: calc(100% - 1rem);
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
    }
    .swiper-pagination-bullet-active {
      background-color: #ff4d57;
    }
  }
  .swiper-slide {
    visibility: hidden;
    height: auto;
    h2 {
      opacity: 0;
      transition: opacity 1s 0.2s;
    }
    .choice-item {
      opacity: 0;
      transition: 0.5s;

      &:nth-child(1) {
        transition-delay: 0.8s;
        animation-delay: 0.8s;
      }
      &:nth-child(2) {
        transition-delay: 1s;
        animation-delay: 1s;
      }
      &:nth-child(3) {
        transition-delay: 1.2s;
        animation-delay: 1.2s;
      }
      &:nth-child(4) {
        transition-delay: 1.4s;
        animation-delay: 1.4s;
      }
    }
  }
  .swiper-slide-active {
    visibility: visible;

    h2,
    .choice-item {
      opacity: 1;
    }
    h2 {
      animation: Bounce 1s;
    }
    .choice-item {
      animation: Right 0.5s;
    }
  }
`;
const QuizSolveCard = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  width: 90%;
  height: 100%;
  border-radius: 25px;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 auto;
  span {
    color: #aaa;
    font-size: 0.8rem;
  }
`;
const CardTitle = styled.h2`
  position: relative;
  display: block;
  text-align: center;
  min-width: 60%;
  margin-top: 10%;
  margin-bottom: 20%;
  padding: 20px 28px;
  font-weight: normal;
  border-radius: 25px;
  background-color: #ff4d57;
  font-size: 1rem;
  color: #fff;
`;
const ChoiceWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 3%;
  &#choice-img-wrapper {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 5px));
    grid-template-rows: repeat(2, 120px);
  }
`;
const ChoiceItem = styled.div`
  position: relative;
  width: 60%;
  label {
    padding: 15px 20px;
    position: relative;
    font-size: 0.8rem;
    display: block;
    border-radius: 18px 0 18px 18px;
    background-color: #f4f4f4;
  }
  input {
    display: none;
  }
  input:checked + label {
    color: #fff;
    background-color: #aad775;
  }
  &#choice-img-item {
    width: 100%;
    height: 100%;
    label {
      padding: 0;
      overflow: hidden;
      border-radius: 18px;
      width: 100%;
      height: 100%;
    }
    input:checked + label {
      color: #fff;
      background-color: #f4f4f4;
      border: 3px solid #aad775;
    }
    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
const QuizSolveBottom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    display: flex;
    span {
      padding-left: 10px;
      font-size: 1.2rem;
    }
    align-items: center;
  }
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
