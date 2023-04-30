import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { useModal } from 'hooks';
import * as S from 'styles/quiz/solve/main.style';
import { MainButton } from 'styles/common';
import { AppLayout } from 'components/layout';
import { Loading, Logo } from 'components/common';
import { NickNameModal } from 'components/modal';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { saveSolveAnswersAction } from 'store/quiz_solve';
import { saveSolveUserScoreAction } from 'store/user_solve';

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { quizList } = useSelector((state: RootState) => state.solve); // 퀴즈 배열
  const [userAnswers, setUserAnswers] = useState<number[]>([]); // 유저가 고른 답
  const [loading, setLoading] = useState<Boolean>(false);
  
  // 유저가 고른 답 (빈문자열 혹은 꽉찬 배열 : state 로 인해 값이 초기화되는 것을 방지)
  let answers: number[] = userAnswers;
  let remainingQuizCount: number = quizList.length - answers.filter((element) => element !== undefined).length;

  const [openModal, , RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NickNameModal setLoading={setLoading} />,
  });

  /** 항목 선택 시 작동하는 함수 */
  const onChange = () => {
    setUserAnswers(
      quizList.map((quiz: SolveQuizType, index: number) => {
        // 정답(correct_choice)의 id 와 일치하는 항목을 찾아내서 정답지 배열을 생성
        return quiz.correctIndex != userAnswers[index] ? answers[index] : 'catch';
      }),
    );
  };

  // 컴포넌트 분리 예정
  const QuizList = quizList.map((item: SolveQuizType, i: number) => (
    <S.QuizSolveCard key={i}>
      <S.QuizCount>{i + 1} / {quizList.length}</S.QuizCount>
      <S.QuizTitle>{i + 1}. {item.quizTitle}</S.QuizTitle>
      {item.quizThumbnail && (
        <S.QuizImageWrapper>
          <img alt="퀴즈 설명 이미지" src={item.quizThumbnail} />
        </S.QuizImageWrapper>
      )}
      {item.choiceType === 'img' ? (
        <S.ChoiceWrapper id="choice-img-wrapper">
          {item.choices.map((choice: string, j: number) => (
            <S.ChoiceItem key={j} className="choice-item" id="choice-img-item">
              <input
                type="radio"
                id={`choice_img_${i}_${j}`}
                name={`choice_img_${i}`}
                value={choice}
                onChange={() => {
                  answers[i] = j;
                  onChange();
                }}
              />
              <label htmlFor={`choice_img_${i}_${j}`}>
                <img src={choice} />
              </label>
            </S.ChoiceItem>
          ))}
        </S.ChoiceWrapper>
      ) : (
        <S.ChoiceWrapper>
          {item.choices.map((choice: string, j: number) => (
            <S.ChoiceItem key={j} className="choice-item" id="choice-txt-item">
              <input
                type="radio"
                id={`choice_txt_${i}_${j}`}
                name={`choice_txt_${i}`}
                value={choice}
                onChange={() => {
                  answers[i] = j;
                  onChange();
                }}
              />
              <label htmlFor={`choice_txt_${i}_${j}`}>{choice}</label>
            </S.ChoiceItem>
          ))}
        </S.ChoiceWrapper>
      )}
    </S.QuizSolveCard>
  ));

  return (
    <S.Container>
      <Logo />
      <S.QuizSolveContent>{QuizList}</S.QuizSolveContent>
      <S.QuizSolveBottom>
        <MainButton
          className={remainingQuizCount == 0 ? 'on' : ''}
          onClick={() => {
            dispatch(saveSolveAnswersAction({ answerList: userAnswers }));
            dispatch(
              saveSolveUserScoreAction({
                solveUserScore: userAnswers.filter((element: any) => 'catch' === element).length,
              }),
            );
            openModal();
          }}
        >
          결과 확인하기
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
