import { useInput } from 'hooks';
import { useRouter } from 'next/router';
import { CommentSaveApi } from 'pages/api/quiz';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';

interface CommentFormProps {
  commentsHandler: (comments: CommentType[]) => void;
}

const CommentForm = ({ commentsHandler }: CommentFormProps) => {
  const router = useRouter();
  const { quizset_id } = router.query; // [quizset_id]/result/[solver_id] 형태의 url에서 사용 가능
  const [commentInput, , commentInputClear, commentInputHandler] = useInput<string>('');
  const { isLoggedin, userId } = useSelector((state: RootState) => state.user);
  const { solveUserName } = useSelector((state: RootState) => state.user_solve);

  const saveComment = async () => {
    try {
      const res = await CommentSaveApi(solveUserName, commentInput, quizset_id as string, isLoggedin && userId);
      commentsHandler(res);
      commentInputClear();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form>
      <input
        type="text"
        value={commentInput}
        onChange={commentInputHandler}
        id="comment-input"
        maxLength={50}
        placeholder="한줄평 남기기.."
      />
      <button disabled={commentInput.length === 0} onClick={saveComment}>
        등록
      </button>
    </Form>
  );
};
const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  margin: 17px 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_500};
  input {
    border-radius: 8px;
    border: 0;
    flex-grow: 1;
    outline-style: none;
    padding: 16px 24px;
    ::placeholder {
      color: ${({ theme }) => theme.colors.blackColors.grey_400};
    }
  }
  button {
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
export default CommentForm;
