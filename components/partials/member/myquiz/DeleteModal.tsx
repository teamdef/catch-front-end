import { Loading } from 'components/common';
import { SmallContainedBtn, SmallOutlinedBtn } from 'components/style/button';
import { ModalProps } from 'hooks/useModal';
import Router from 'next/router';
import { QuizDeleteApi } from 'pages/api/quiz';
import React, { useState } from 'react';
import styled from 'styled-components';

interface DeleteModalProps {
  closeModal?: ModalProps['closeModal'];
  quizSetId: string;
}
const DeleteModal = ({ closeModal, quizSetId }: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);
  const deleteQuizSet = async () => {
    setLoading(true);
    try {
      await QuizDeleteApi(quizSetId as string);
      Router.push('/member/myquiz/anyquiz/');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loading text="퀴즈 삭제 중 입니다." />;
  return (
    <Wrapper>
      <Title>퀴즈를 정말 삭제하시겠습니까?</Title>
      <Sub>삭제된 퀴즈는 복구가 불가능합니다.</Sub>
      <ButtonBox>
        <SmallOutlinedBtn onClick={closeModal} error>
          취소
        </SmallOutlinedBtn>
        <SmallContainedBtn onClick={deleteQuizSet} error>
          삭제
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
  padding: 36px 24px 28px;
  margin: 0 9%;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.body_1};
`;
const Sub = styled.p`
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  flex-grow: 1;
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 18px;
  justify-content: space-between;
  button {
    flex-grow: 1;
  }
`;
export default DeleteModal;
