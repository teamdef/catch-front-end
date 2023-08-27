import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuizTitle } from 'components/style';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuizListAction } from 'store/quiz';
import { RootState } from 'store';
import { QuizCount, QuizSolveCard } from '../solve/main/QuizItem';
import { CreateChoiceTextList, CreateQuizBottom, QuizImageWrapper, CreateChoiceImageList, AddQuizBtn } from '.';

interface CreateQuizListProps {
  isContinue: boolean;
}
const CreateQuizList = ({ isContinue }: CreateQuizListProps) => {
  const dispatch = useDispatch();
  const { quizList } = useSelector((state: RootState) => state.quiz);
  const [_quizList, _setQuizList] = useState<(TextQuiz | ImageQuiz)[]>(quizList); // 문제 내부 저장 배열

  // 문제 정보를 변경하는 함수
  const onChangeProblem = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    const problem = { ..._quizList[index], [name]: value };
    const temp = [..._quizList];
    temp[index] = problem;
    _setQuizList(temp);
  };

  // 퀴즈 세트 문항 변경 사항 바로 redux에 저장
  useEffect(() => {
    dispatch(saveQuizListAction({ quizList: _quizList }));
  }, [_quizList]);

  useEffect(() => {
    if (isContinue) _setQuizList([]);
  }, [isContinue]);
  return (
    <>
      {_quizList.map((quiz: TextQuiz | ImageQuiz, quizIndex: number) => (
        <QuizSolveCard>
          <QuizTitle>
            <QuizCount>Q {_quizList.length + 1}.</QuizCount>
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
            setQuizList={_setQuizList}
            imgURL={quiz.quizThumbnail?.imgURL}
            quizIndex={quizIndex}
          />
          {quiz.choiceType === 'text' && <CreateChoiceTextList props={{ quiz, quizIndex, quizList, _setQuizList }} />}
          {quiz.choiceType === 'img' && <CreateChoiceImageList props={{ quiz, quizIndex, quizList, _setQuizList }} />}
          <CreateQuizBottom quizList={quizList} setQuizList={_setQuizList} quizIndex={quizIndex} />
        </QuizSolveCard>
      ))}
      <AddQuizBtn setQuizList={_setQuizList} />
    </>
  );
};

const QuizTitleInput = styled.input`
  border: 0;
`;

export default CreateQuizList;
