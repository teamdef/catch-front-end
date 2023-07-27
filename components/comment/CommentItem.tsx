import ProfileImage from 'components/common/ProfileImage';
import styled from 'styled-components';
import { theme } from 'styles/theme';

const CommentItem = ({ comment }: { comment: CommentType }) => {
  return (
    <Wrapper>
      <ProfileImage src={comment.user?.profile_img} />
      <TextBox>
        <Nickname>{comment.nickname}</Nickname>
        <Content>{comment.content}</Content>
      </TextBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
`;
const TextBox = styled.div`
  margin-left: 16px;
`;
const Nickname = styled.span`
  color: ${theme.colors.blackColors.grey_900};
  font-weight: ${theme.fontWeight.bold};
`;
const Content = styled.p`
  color: ${theme.colors.blackColors.grey_800};
`;
export default CommentItem;
