import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInput } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { saveSolveUserNameAction } from 'store/user_solve';
import { RootState } from 'store';
import { ModalProps } from 'hooks/useModal';
import SmallOutlinedBtn from 'components/style/button/SmallOutlinedBtn';
import SmallContainedBtn from 'components/style/button/SmallContainedBtn';
import { SaveScoreApi } from 'pages/api/quiz';
import { useRouter } from 'next/router';
import { saveEmotionCount } from 'store/emotion';

const NicknameModal = ({ closeModal }: { closeModal?: ModalProps['closeModal'] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedin, nickName, userId } = useSelector((state: RootState) => state.user);
  const [_nickname, _nicknameSetter, , _nicknameHandler] = useInput<string>('');
  const { quizSetId, quizList } = useSelector((state: RootState) => state.solve);
  const { solveUserScore } = useSelector((state: RootState) => state.user_solve);

  const saveUserData = async () => {
    try {
      dispatch(saveSolveUserNameAction({ solveUserName: _nickname }));
      const res = await SaveScoreApi(
        _nickname,
        solveUserScore,
        quizSetId,
        isLoggedin ? userId : undefined,
        quizList.length,
      );
      const { quizset_emotion, solver_id } = res.data;
      dispatch(saveEmotionCount({ quizSetEmotion: quizset_emotion }));
      router.push(`/quiz/solve/${quizSetId}/result/${solver_id}`);
      if (closeModal) closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoggedin) _nicknameSetter(nickName);
  }, []);

  return (
    <Wrapper>
      <Title>닉네임을 입력해주세요</Title>
      <Input type="text" value={_nickname} onChange={_nicknameHandler} placeholder="최대 12자까지" maxLength={12} />
      <ButtonBox>
        <SmallOutlinedBtn onClick={closeModal}>취소</SmallOutlinedBtn>
        <SmallContainedBtn disabled={!_nickname} onClick={saveUserData}>
          저장
        </SmallContainedBtn>
      </ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 184px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 24px;
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
