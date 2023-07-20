import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveSolveAnswersAction } from 'store/quiz_solve';
import * as S from 'styles/quiz/solve/main.style';

interface QuizItemPropsType {
  item: SolveQuizType;
  quiz_num: number;
}

const QuizItem = ({ item, quiz_num }: QuizItemPropsType) => {
  const dispatch = useDispatch();
  const { answerList } = useSelector((state: RootState) => state.solve);
  const copy_answer = [...answerList];

  const onChange = (_quiz_num: number, choice_num: number) => {
    copy_answer[_quiz_num] = choice_num;
    dispatch(saveSolveAnswersAction({ answerList: copy_answer }));
  };
  const choice_img = (
    <S.ChoiceImgWrapper id="choice-img-wrapper">
      {item.choices.map((choice: string, choice_num: number) => (
        <>
          <S.ChoiceImgInput
            type="radio"
            id={`choice_img_${quiz_num}_${choice_num}`}
            name={`choice_img_${quiz_num}`}
            value={choice}
            checked={answerList[quiz_num] === choice_num}
            onChange={() => {
              onChange(quiz_num, choice_num);
            }}
          />
          <S.ChoiceImgLabel htmlFor={`choice_img_${quiz_num}_${choice_num}`} imgSrc={choice} />
        </>
      ))}
    </S.ChoiceImgWrapper>
  );
  const choice_text = (
    <S.ChoiceWrapper>
      {item.choices.map((choice: string, choice_num: number) => (
        <>
          <S.ChoiceTextInput
            type="radio"
            id={`choice_txt_${quiz_num}_${choice_num}`}
            name={`choice_txt_${quiz_num}`}
            value={choice}
            checked={answerList[quiz_num] === choice_num}
            onChange={() => {
              onChange(quiz_num, choice_num);
            }}
          />
          <S.ChoiceTextLabel htmlFor={`choice_txt_${quiz_num}_${choice_num}`}>{choice}</S.ChoiceTextLabel>
        </>
      ))}
    </S.ChoiceWrapper>
  );

  return (
    <S.QuizSolveCard key={quiz_num}>
      <S.QuizTitle>
        <S.QuizCount>Q {quiz_num + 1}.</S.QuizCount>
        {item.quiz_title}
      </S.QuizTitle>
      {item.quiz_thumbnail && <S.QuizImageWrapper src={item.quiz_thumbnail} />}
      {item.choice_type === 'img' && choice_img}
      {item.choice_type === 'text' && choice_text}
      <S.QuizGuide>퀴즈의 정답을 선택해주세요!</S.QuizGuide>
    </S.QuizSolveCard>
  );
};
export default QuizItem;
