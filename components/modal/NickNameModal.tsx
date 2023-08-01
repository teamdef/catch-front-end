import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInput } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { saveSolveUserNameAction } from 'store/user_solve';
import { RootState } from 'store';
import saveScore from 'utils/score';
import { ModalProps } from 'hooks/useModal';
import SmallOutlinedBtn from 'components/style/button/SmallOutlinedBtn';
import SmallContainedBtn from 'components/style/button/SmallContainedBtn';

const NicknameModal = ({ closeModal }: { closeModal?: ModalProps['closeModal'] }) => {
  const dispatch = useDispatch();
  const { isLoggedin, nickName } = useSelector((state: RootState) => state.user);
  const [_nickname, _nicknameSetter, , _nicknameHandler] = useInput<string>('');

  const saveUserData = async () => {
    try {
      saveScore(_nickname);
      dispatch(saveSolveUserNameAction({ solveUserName: _nickname }));
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
