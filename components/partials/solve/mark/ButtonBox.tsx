import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';

const ButtonBox = () => {
  const router = useRouter();
  const { quizset_id } = router.query;

  const goReplay = useCallback(() => {
    if (quizset_id) router.push(`/quiz/solve/${quizset_id}`);
  }, [quizset_id]);

  const moveHome = () => router.push(`/`);
  return (
    <Wrapper>
      <Button onClick={goReplay}>퀴즈 다시 풀기</Button>
      <Button onClick={moveHome}>
        퀴즈 둘러보기
        <img src="/assets/img/rebranding/icon/arrow_right_grey800.svg" alt="퀴즈둘러보기아이콘이미지" />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Button = styled.button`
  display: flex;
  padding: 8px;
  color: ${({ theme }) => theme.colors.blackColors.grey_800};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  img {
    margin-left: 10px;
  }
`;
export default ButtonBox;
