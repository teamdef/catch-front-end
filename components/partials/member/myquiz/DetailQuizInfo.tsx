import ImageSetter from 'components/common/ImageSetter';
import { useModal } from 'hooks';
import styled from 'styled-components';
import DeleteModal from './DeleteModal';

interface DetailQuizInfoProps {
  detail: DetailQuizType;
}
const DetailQuizInfo = ({ detail }: DetailQuizInfoProps) => {
  const { setTitle, quizSetThumbnail, createdAt, quizSetId } = detail;
  const [openModal, , RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <DeleteModal quizSetId={quizSetId} />,
  });

  return (
    <Wrapper>
      <RenderModal />
      <QuizTitle>{setTitle}</QuizTitle>
      <DeleteQuizSetBtn onClick={openModal}>삭제</DeleteQuizSetBtn>
      <QuizDateBox>
        <span>생성 날짜</span>
        <span>{createdAt}</span>
        <span>마지막으로 푼 날짜</span>
        <span>{createdAt}</span>
      </QuizDateBox>
      <ImageSetter quizSetThumb={quizSetThumbnail} quizSetId={quizSetId} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  margin-top: 23px;
`;
const QuizTitle = styled.h3`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-size: ${({ theme }) => theme.fontSize.body_1};
  font-weight: ${({ theme }) => theme.fontWeight.extra_bold};
`;
const QuizDateBox = styled.div`
  position: relative;
  display: grid;
  margin-top: 10px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  font-size: ${({ theme }) => theme.fontSize.caption};
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const DeleteQuizSetBtn = styled.button`
  position: absolute;
  display: block;
  top: -14px;
  right: 0;
  padding: 14px;
  font-size: ${({ theme }) => theme.fontSize.body_1};
  color: ${({ theme }) => theme.colors.error_1};
`;
export default DetailQuizInfo;
