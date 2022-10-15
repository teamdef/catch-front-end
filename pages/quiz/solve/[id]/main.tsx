import styled from 'styled-components';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { Button } from 'components/common';
import type { NextPageWithLayout } from 'pages/_app';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveSolveProblemsAction } from 'store/quiz_solve';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

// quiz/solve/1/result
const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { solveSetTitle } = useSelector((state: RootState) => state.solve);
  const { solveProblems } = useSelector((state: RootState) => state.solve);
  console.log(solveProblems);

  let answers = solveProblems.map((prob, index) => {
    // 정답(correct_choice)의 id 와 일치하는 항목을 찾아내서 정답지 배열을 생성
    let result = prob.choices.find((choice)=>{
      return choice.id === prob.correct_choice;
    })
    // result : id 와 cho_txt||cho_img 를 가진 object
    return result.cho_txt;
  })

  console.log("답지",answers); 

  let userAnswers: string[] = [];
  const QuizList = solveProblems.map((item, i) => (
    <SwiperSlide key={i}>
      <h2>{item.prob_title}</h2>
      <div>
        {item.choices.map((choice, j) => (
          <div key={j}>
            <input
              type="radio"
              id={choice.id}
              name={`choice_${i}`}
              value={choice.cho_txt}
              onChange={() => {
                userAnswers[i] = choice.cho_txt;
                console.log("유저가 고른답",userAnswers);
              }}
            />
            <label htmlFor={choice.id}>{choice.cho_txt}</label>
          </div>
        ))}
      </div>
    </SwiperSlide>
  ));
  return (
    <Container>
      <header>
        <Logo>캐치캐치</Logo>
      </header>
      <h1>{solveSetTitle}</h1>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
      >
        {QuizList}
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: block;
  background-color: #fff6f7;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 5%;
  width: 100%;
  height: 100vh;
`;
const Logo = styled.div`
  position: relative;
  display: block;
  font-size: 1.5rem;
  padding-top: 5%;
  font-family: 'RixInooAriDuriR';
  color: #ff4d57;
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
