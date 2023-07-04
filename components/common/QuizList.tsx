import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import * as S from 'styles/quiz/solve/main.style';
interface QuizListPropsType {
  userAnswers: number[];
  setUserAnswers: Dispatch<SetStateAction<number[]>>;
}

const QuizList = ({ userAnswers, setUserAnswers }: QuizListPropsType) => {
  const { quizList } = useSelector((state: RootState) => state.solve);
  // let remainingQuizCount: number = quizList.length - answers.filter((element) => element !== undefined).length;
  const copy_answer = [...userAnswers];
  const onChange = (quiz_num: number, choice_num: number) => {
    copy_answer[quiz_num] = choice_num;
    setUserAnswers(copy_answer);
  };
  useEffect(() => {});
  return quizList.map((item: SolveQuizType, quiz_num: number) => (
    <S.QuizSolveCard key={quiz_num}>
      <S.QuizCount>
        {quiz_num + 1} / {quizList.length}
      </S.QuizCount>
      <S.QuizTitle>
        {quiz_num + 1}. {item.quizTitle}
      </S.QuizTitle>
      {item.quizThumbnail && (
        <S.QuizImageWrapper>
          <img alt="퀴즈 설명 이미지" src={item.quizThumbnail} />
        </S.QuizImageWrapper>
      )}
      {item.choiceType === 'img' ? (
        <S.ChoiceWrapper id="choice-img-wrapper">
          {item.choices.map((choice: string, choice_num: number) => (
            <S.ChoiceItem key={choice_num} className="choice-item" id="choice-img-item">
              <input
                type="radio"
                id={`choice_img_${quiz_num}_${choice_num}`}
                name={`choice_img_${quiz_num}`}
                value={choice}
                onChange={() => {
                  onChange(quiz_num, choice_num);
                }}
              />
              <label htmlFor={`choice_img_${quiz_num}_${choice_num}`}>
                <img src={choice} />
              </label>
            </S.ChoiceItem>
          ))}
        </S.ChoiceWrapper>
      ) : (
        <S.ChoiceWrapper>
          {item.choices.map((choice: string, choice_num: number) => (
            <S.ChoiceItem key={choice_num} className="choice-item" id="choice-txt-item">
              <input
                type="radio"
                id={`choice_txt_${quiz_num}_${choice_num}`}
                name={`choice_txt_${quiz_num}`}
                value={choice}
                onChange={() => {
                  onChange(quiz_num, choice_num);
                }}
              />
              <label htmlFor={`choice_txt_${quiz_num}_${choice_num}`}>{choice}</label>
            </S.ChoiceItem>
          ))}
        </S.ChoiceWrapper>
      )}
    </S.QuizSolveCard>
  ));
};
export default QuizList;
