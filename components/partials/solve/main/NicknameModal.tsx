import { useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { useInput } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { ModalProps } from 'hooks/useModal';
import { SmallContainedBtn, SmallOutlinedBtn } from 'components/style/button';
import { SaveScoreApi } from 'pages/api/quiz';
import { saveEmotionCount } from 'store/emotion';
import { moveResult } from 'utils/move';
import { Loading } from 'components/common';

interface NicknameModalProps {
  closeModal?: ModalProps['closeModal'];
}
const NicknameModal = ({ closeModal }: NicknameModalProps) => {
  const dispatch = useDispatch();
  const { userId, isLoggedin, nickName } = useSelector((state: RootState) => state.user);
  const { quizList, answerList } = useSelector((state: RootState) => state.solve);
  const [_nickname, , , _nicknameHandler] = useInput<string>(isLoggedin ? (nickName as string) : '');

  const userScore = useMemo(
    () => quizList.filter((quiz: SolveQuizType, quiz_num: number) => quiz.correct_idx === answerList[quiz_num]).length,
    [answerList],
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: () => {
      return SaveScoreApi(_nickname, userScore, userId, quizList.length);
    },
    onSuccess: (data) => {
      const { quizset_emotion, solver_id } = data.data;
      dispatch(saveEmotionCount({ quizSetEmotion: quizset_emotion }));
      moveResult(solver_id);
      if (closeModal) closeModal();
    },
  });

  if (isLoading) return <Loading text="결과 출력 중 입니다." />;
  return (
    <Wrapper>
      <Title>닉네임을 입력해주세요</Title>
      <Input type="text" value={_nickname} onChange={_nicknameHandler} placeholder="최대 12자까지" maxLength={12} />
      <ButtonBox>
        <SmallOutlinedBtn onClick={closeModal}>취소</SmallOutlinedBtn>
        <SmallContainedBtn disabled={!_nickname} onClick={() => mutate()}>
          저장
        </SmallContainedBtn>
      </ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 184px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 24px;
  margin: 0 9%;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.body_1};
`;
const Input = styled.input`
  margin-top: 18px;
  color: ${({ theme }) => theme.colors.blackColors.grey_700};
  font-size: ${({ theme }) => theme.fontSize.caption};
  padding-bottom: 6px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_300};
`;
const ButtonBox = styled.div`
  margin-top: 36px;
  display: flex;
  gap: 18px;
  justify-content: space-between;
  button {
    flex-grow: 1;
  }
`;
export default NicknameModal;
