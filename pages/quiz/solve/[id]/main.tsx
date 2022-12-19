import { useState } from 'react';
import type { ReactElement } from 'react';
import * as S from 'styles/quiz/solve/main.style';
import { AppLayout } from 'components/layout';
import { Loading, Logo, SwipeAniIcon } from 'components/common';
import type { NextPageWithLayout } from 'pages/_app';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveSolveAnswersAction } from 'store/quiz_solve';
import { saveSolveUserScoreAction } from 'store/user_solve';
import { BiChevronRight } from 'react-icons/bi';
import { useModal } from 'hooks';
import { MainButton } from 'styles/common';
import { NickNameModal } from 'components/modal';

const Page: NextPageWithLayout = () => {
  const [choice, setChoice] = useState<Boolean>(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { solveProblemSetTitle, solveProblems } = useSelector((state: RootState) => state.solve);
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
      console.log(answers);
      setUserAnswers(answers);
    }
  };

  const QuizList = solveProblems.map((item: any, i: number) => (
    <S.QuizSolveCard key={i}>
      <div id="quiz-num-flag">
        <img id="flag-icon" src="/assets/img/flag_icon.svg" />
        <div id="quiz-num">{i + 1}</div>
      </div>
      <div id="quiz-title">{item.prob_title}</div>
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
                  answers[i] = _choice.cho_img;
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
            <S.ChoiceItem key={j} className="choice-item" id="choice-item-txt">
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
      <S.QuizSolveContent>
        {QuizList}
      </S.QuizSolveContent>
      <S.QuizSolveBottom>
        <MainButton
          className={choice ? 'on' : ''}
          style={{ width: '90%', margin: '0' }}
          onClick={() => {
            console.log(matchList);
            dispatch(saveSolveAnswersAction({ solveAnswers: matchList }));
            dispatch(
              saveSolveUserScoreAction({
                solveUserScore: matchList.filter((element: any) => undefined === element).length,
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
