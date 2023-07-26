import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveSolveAnswersAction } from 'store/quiz_solve';
import styled from 'styled-components';

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
    <ChoiceImgWrapper id="choice-img-wrapper">
      {item.choices.map((choice: string, choice_num: number) => (
        <>
          <ChoiceImgInput
            type="radio"
            id={`choice_img_${quiz_num}_${choice_num}`}
            name={`choice_img_${quiz_num}`}
            value={choice}
            checked={answerList[quiz_num] === choice_num}
            onChange={() => {
              onChange(quiz_num, choice_num);
            }}
          />
          <ChoiceImgLabel htmlFor={`choice_img_${quiz_num}_${choice_num}`} imgSrc={choice} />
        </>
      ))}
    </ChoiceImgWrapper>
  );
  const choice_text = (
    <ChoiceWrapper>
      {item.choices.map((choice: string, choice_num: number) => (
        <>
          <ChoiceTextInput
            type="radio"
            id={`choice_txt_${quiz_num}_${choice_num}`}
            name={`choice_txt_${quiz_num}`}
            value={choice}
            checked={answerList[quiz_num] === choice_num}
            onChange={() => {
              onChange(quiz_num, choice_num);
            }}
          />
          <ChoiceTextLabel htmlFor={`choice_txt_${quiz_num}_${choice_num}`}>{choice}</ChoiceTextLabel>
        </>
      ))}
    </ChoiceWrapper>
  );

  return (
    <QuizSolveCard key={quiz_num}>
      <QuizTitle>
        <QuizCount>Q {quiz_num + 1}.</QuizCount>
        {item.quiz_title}
      </QuizTitle>
      {item.quiz_thumbnail && <QuizImageWrapper src={item.quiz_thumbnail} />}
      {item.choice_type === 'img' && choice_img}
      {item.choice_type === 'text' && choice_text}
      <QuizGuide>퀴즈의 정답을 선택해주세요!</QuizGuide>
    </QuizSolveCard>
  );
};

const QuizSolveCard = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 56px;
  &:last-child {
    margin-bottom: 0;
  }
  flex-direction: column;
  flex-wrap: nowrap;
`;

const QuizTitle = styled.div`
  display: flex;
  color: #000;
  font-size: ${({ theme }) => theme.fontSize.body_2};
  font-weight: 700;
  line-height: 130%; /* 18.2px */
  letter-spacing: -0.7px;
  margin-left: 4px;
`;

const QuizCount = styled.span`
  margin-right: 12px;
  flex: none;
`;

const QuizImageWrapper = styled.img`
  margin-top: 12px;
  width: 100%;
  height: 185px;
  object-fit: contain;
  border-radius: 4px;
`;

const ChoiceWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`;
const ChoiceImgWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  margin-top: 20px;
`;
const ChoiceImgLabel = styled.label<{ imgSrc: string }>`
  position: relative;
  width: 100%;
  height: 150px;
  padding: 0;
  border-radius: 15px;
  overflow: hidden;
  object-fit: cover;
  background: center / contain no-repeat url(${({ imgSrc }) => imgSrc || ''});
`;

const ChoiceImgInput = styled.input`
  display: none;
  &:checked + ${ChoiceImgLabel} {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    background-blend-mode: multiply;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 39px;
      height: 29px;
      background: center no-repeat url(/assets/img/rebranding/icon/check_img.svg);
      z-index: 1;
    }
  }
`;

const ChoiceTextLabel = styled.label`
  width: 100%;
  padding: 22px 24px;
  font-size: ${({ theme }) => theme.fontSize.body_2};
  font-weight: 400;
  line-height: normal;
  border: 1px solid ${({ theme }) => theme.colors.secondary_500};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.secondary_500};
`;
const ChoiceTextInput = styled.input`
  display: none;
  &:checked + ${ChoiceTextLabel} {
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.secondary_500};
    color: #fff;
    &::before {
      content: '';
      position: absolute;
      right: 24px;
      display: block;
      width: 18px;
      height: 14px;
      background-image: url(/assets/img/rebranding/icon/check_text.svg);
    }
  }
`;
const QuizGuide = styled.span`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;
export default QuizItem;
