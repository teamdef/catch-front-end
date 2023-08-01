import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInput } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { saveSolveUserNameAction } from 'store/user_solve';
import { RootState } from 'store';
import saveScore from 'utils/score';
import { ModalProps } from 'hooks/useModal';

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
      <input type="text" value={_nickname} onChange={_nicknameHandler} placeholder="최대 12자까지" maxLength={12} />
      <Button onClick={closeModal}>취소</Button>
      <Button disabled={!_nickname} onClick={saveUserData}>
        저장
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 184px;
`;
const Title = styled.h2``;
const Button = styled.button``;
export default NicknameModal;
