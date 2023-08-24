import { useInput } from 'hooks';
import { useRouter } from 'next/router';
import { CommentSaveApi } from 'pages/api/quiz';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';

interface CommentInputProps {
  commentsHandler: (comments: CommentType[]) => void;
}

const CommentInput = ({ commentsHandler }: CommentInputProps) => {
  const router = useRouter();
  const { quizset_id } = router.query; // [quizset_id]/result/[solver_id] 형태의 url에서 사용 가능
  const [commentInput, , commentInputClear, commentInputHandler] = useInput<string>('');
  const { isLoggedin, userId } = useSelector((state: RootState) => state.user);
  const { solveUserName } = useSelector((state: RootState) => state.user_solve);

  const saveComment = useCallback(async () => {
    try {
      const res = await CommentSaveApi(solveUserName, commentInput, quizset_id as string, isLoggedin && userId);
      commentsHandler(res);
      console.log(commentInput);
      commentInputClear();
    } catch (err) {
      console.log(err);
    }
  }, [commentInput, quizset_id, solveUserName, isLoggedin, userId]);

  return (
    <Wrapper>
      <input
        type="text"
        value={commentInput}
        onChange={commentInputHandler}
        id="comment-input"
        maxLength={50}
        placeholder="한줄평 남기기.."
      />
      <button disabled={!commentInput} onClick={saveComment}>
        등록
      </button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  width: 100%;
  flex: none;
  justify-content: end;
  padding: 12px;
  background-color: #fff;
  box-shadow: 0px -4px 13px 0px rgba(180, 160, 255, 0.12);
  input {
    position: relative;
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.secondary_500};
    flex-grow: 1;
    padding: 16px 24px;
    ::placeholder {
      color: ${({ theme }) => theme.colors.blackColors.grey_400};
    }
  }
  button {
    position: absolute;
    background-color: transparent;
    padding: 16px 24px;
    display: block;
    color: ${({ theme }) => theme.colors.secondary_500};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.body_2};
    &:disabled {
      opacity: 0.5;
    }
  }
`;
export default CommentInput;
