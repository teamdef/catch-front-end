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

  const onChange = (quiz_num: number, choice_num: number) => {
    copy_answer[quiz_num] = choice_num;
    dispatch(saveSolveAnswersAction({ answerList: copy_answer }));
  };
  const choice_img = (
    <S.ChoiceWrapper id="choice-img-wrapper">
      {item.choices.map((choice: string, choice_num: number) => (
        <S.ChoiceItem key={choice_num} className="choice-item" id="choice-img-item">
          <input
            type="radio"
            id={`choice_img_${quiz_num}_${choice_num}`}
            name={`choice_img_${quiz_num}`}
            value={choice}
            checked={answerList[quiz_num] == choice_num}
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
  );
  const choice_text = (
    <S.ChoiceWrapper>
      {item.choices.map((choice: string, choice_num: number) => (
        <S.ChoiceItem key={choice_num} className="choice-item" id="choice-txt-item">
          <input
            type="radio"
            id={`choice_txt_${quiz_num}_${choice_num}`}
            name={`choice_txt_${quiz_num}`}
            value={choice}
            checked={answerList[quiz_num] == choice_num}
            onChange={() => {
              onChange(quiz_num, choice_num);
            }}
          />
          <label htmlFor={`choice_txt_${quiz_num}_${choice_num}`}>{choice}</label>
        </S.ChoiceItem>
      ))}
    </S.ChoiceWrapper>
  );

  return (
    <S.QuizSolveCard key={quiz_num}>
      <S.QuizCount>
        {quiz_num + 1} / {answerList.length}
      </S.QuizCount>
      <S.QuizTitle>
        {quiz_num + 1}. {item.quiz_title}
      </S.QuizTitle>
      {item.quiz_thumbnail && (
        <S.QuizImageWrapper>
          <img alt="퀴즈 설명 이미지" src={item.quiz_thumbnail} />
        </S.QuizImageWrapper>
      )}
      {item.choice_type == 'img' && choice_img}
      {item.choice_type == 'text' && choice_text}
    </S.QuizSolveCard>
  );
};
export default QuizItem;
