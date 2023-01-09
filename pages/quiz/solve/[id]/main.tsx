import { useState } from 'react';
import type { ReactElement } from 'react';
import * as S from 'styles/quiz/solve/main.style';
import { AppLayout } from 'components/layout';
import { Loading, Logo } from 'components/common';
import type { NextPageWithLayout } from 'pages/_app';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveSolveAnswersAction } from 'store/quiz_solve';
import { saveSolveUserScoreAction } from 'store/user_solve';
import { useModal } from 'hooks';
import { MainButton } from 'styles/common';
import { NickNameModal } from 'components/modal';

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { solveProblems } = useSelector((state: RootState) => state.solve); // 퀴즈 배열
  const [userAnswers, setUserAnswers] = useState<string[]>([]); // 유저가 고른 답
  const [count, setCount] = useState(solveProblems.length); // 남은 퀴즈 개수
  const [loading, setLoading] = useState<Boolean>(false);
  // 유저가 고른 답 (빈문자열 혹은 꽉찬 배열 : state 로 인해 값이 초기화되는 것을 방지)
  let answers: string[] = userAnswers;
  /** 항목 선택 시 작동하는 함수 */
  const onChange = () => {
    setCount(solveProblems.length - answers.filter((element) => element !== undefined).length);
    setUserAnswers(
      solveProblems.map((prob: any, index: number) => {
        // 정답(correct_choice)의 id 와 일치하는 항목을 찾아내서 정답지 배열을 생성
        if (prob.correct_choice != userAnswers[index]) {
          return answers[index];
        } else {
          return 'catch';
        }
      }),
    );
  };
  console.log(userAnswers);
  const QuizList = solveProblems.map((item: any, i: number) => (
    <S.QuizSolveCard key={i}>
      <S.CardNumber>{i + 1}</S.CardNumber>
      <S.QuizTitle>{item.prob_title}</S.QuizTitle>
      {item.is_img ? (
        <S.ChoiceWrapper id="choice-img-wrapper">
          {item.choices.map((_choice: any, j: number) => (
            <S.ChoiceItem key={j} className="choice-item" id="choice-img-item">
              <input
                type="radio"
                id={_choice.id}
                name={`choice_${i}`}
                value={_choice.cho_img}
                onChange={() => {
                  answers[i] = _choice.id;
                  onChange();
                }}
              />
              <label htmlFor={_choice.id}>
                <img src={_choice.cho_img} />
              </label>
            </S.ChoiceItem>
          ))}
        </S.ChoiceWrapper>
      ) : (
        <S.ChoiceWrapper>
          {item.choices.map((_choice: any, j: number) => (
            <S.ChoiceItem key={j} className="choice-item" id="choice-txt-item">
              <input
                type="radio"
                id={_choice.id}
                name={`choice_${i}`}
                value={_choice.cho_txt}
                onChange={() => {
                  answers[i] = _choice.id;
                  onChange();
                }}
              />
              <label htmlFor={_choice.id}>{_choice.cho_txt}</label>
            </S.ChoiceItem>
          ))}
        </S.ChoiceWrapper>
      )}
    </S.QuizSolveCard>
  ));

  const [openModal, closeModal, RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NickNameModal setLoading={setLoading} />,
  });

  return (
    <S.Container>
      <Logo />
      <S.QuizCount>
        <p>남은 퀴즈 <span>{solveProblems.length - answers.filter((element) => element !== undefined).length}</span></p>
      </S.QuizCount>
      <S.QuizSolveContent>{QuizList}</S.QuizSolveContent>
      <S.QuizSolveBottom>
        <MainButton
          className={count == 0 ? 'on' : ''}
          onClick={() => {
            dispatch(saveSolveAnswersAction({ solveAnswers: userAnswers }));
            dispatch(
              saveSolveUserScoreAction({
                solveUserScore: userAnswers.filter((element: any) => 'catch' === element).length,
              }),
            );
            openModal();
          }}
        >
          결과확인
        </MainButton>
        <RenderModal />
        {loading ? <Loading ment="결과 출력 중 . . ." /> : ''}
      </S.QuizSolveBottom>
    </S.Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
