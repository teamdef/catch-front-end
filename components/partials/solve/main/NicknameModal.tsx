import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { useInput } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { saveSolveUserNameAction } from 'store/user_solve';
import { RootState } from 'store';
import { ModalProps } from 'hooks/useModal';
import { SmallContainedBtn, SmallOutlinedBtn } from 'components/style/button';

interface NicknameModalProps {
  closeModal?: ModalProps['closeModal'];
  setIsNickname: Dispatch<SetStateAction<boolean>>;
}
const NicknameModal = ({ closeModal, setIsNickname }: NicknameModalProps) => {
  const dispatch = useDispatch();
  const { isLoggedin, nickName } = useSelector((state: RootState) => state.user);
  const [_nickname, _nicknameSetter, , _nicknameHandler] = useInput<string>('');

  const savaSolveUserName = () => {
    dispatch(saveSolveUserNameAction({ solveUserName: _nickname }));
    setIsNickname(true);
    if (closeModal) closeModal();
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
        <SmallContainedBtn disabled={!_nickname} onClick={savaSolveUserName}>
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
