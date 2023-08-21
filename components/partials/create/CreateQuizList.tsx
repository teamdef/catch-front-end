import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { QuizTitle } from 'components/style';
import { useDispatch } from 'react-redux';
import { saveProblemsAction } from 'store/quiz';
import { QuizCount, QuizSolveCard } from '../solve/main/QuizItem';
import { CreateChoiceTextList, CreateQuizBottom, QuizImageWrapper, CreateChoiceImageList } from '.';

interface CreateQuizListProps {
  quizList: (TextQuiz | ImageQuiz)[];
  setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
}
const CreateQuizList = ({ quizList, setQuizList }: CreateQuizListProps) => {
  const dispatch = useDispatch();
  // 문제 정보를 변경하는 함수
  const onChangeProblem = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    const problem = { ...quizList[index], [name]: value };
    const temp = [...quizList];
    temp[index] = problem;
    setQuizList(temp);
  };

  // 퀴즈 세트 문항 변경 사항 바로 redux에 저장
  useEffect(() => {
    dispatch(saveProblemsAction({ quizList }));
  }, [quizList]);

  return (
    <>
      {quizList.map((quiz: TextQuiz | ImageQuiz, quizIndex: number) => (
        <QuizSolveCard>
          <QuizTitle>
            <QuizCount>Q {quizIndex + 1}.</QuizCount>
            <QuizTitleInput
              placeholder="질문을 입력해주세요."
              value={quiz.quizTitle}
              name="quizTitle"
              onChange={(e) => {
                onChangeProblem(e, quizIndex);
              }}
            />
          </QuizTitle>
          <QuizImageWrapper
            quizList={quizList}
            setQuizList={setQuizList}
            imgURL={quiz.quizThumbnail?.imgURL}
            quizIndex={quizIndex}
          />
          {quiz.choiceType === 'text' && <CreateChoiceTextList props={{ quiz, quizIndex, quizList, setQuizList }} />}
          {quiz.choiceType === 'img' && <CreateChoiceImageList props={{ quiz, quizIndex, quizList, setQuizList }} />}
          <CreateQuizBottom quizList={quizList} setQuizList={setQuizList} quizIndex={quizIndex} />
        </QuizSolveCard>
      ))}
    </>
  );
};

const QuizTitleInput = styled.input`
  border: 0;
`;

export default CreateQuizList;
