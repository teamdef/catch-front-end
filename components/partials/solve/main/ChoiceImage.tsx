import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveSolveAnswersAction } from 'store/quiz_solve';
import styled from 'styled-components';
import { ChoiceProps } from 'types/quiz';

const ChoiceImage = ({ choices, quizNum }: ChoiceProps) => {
  const dispatch = useDispatch();
  const { answerList } = useSelector((state: RootState) => state.solve);
  const copy_answer = [...answerList];

  const answerHandler = (_quiz_num: number, choice_num: number) => {
    copy_answer[_quiz_num] = choice_num;
    dispatch(saveSolveAnswersAction({ answerList: copy_answer }));
  };

  return (
    <Wrapper>
      {choices.map((choice: string, choice_num: number) => (
        <>
          <ChoiceImgInput
            type="radio"
            id={`${quizNum}_${choice_num}`}
            name={`${quizNum}`}
            value={choice}
            checked={answerList[quizNum] === choice_num}
            onChange={() => {
              answerHandler(quizNum, choice_num);
            }}
          />
          <ChoiceImgLabel htmlFor={`${quizNum}_${choice_num}`} imgSrc={choice} />
        </>
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
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
  border-radius: 8px;
  overflow: hidden;
  background: center / contain no-repeat url(${({ imgSrc }) => imgSrc || ''});
  background-size: cover;
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

export default ChoiceImage;
