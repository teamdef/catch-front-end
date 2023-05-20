// 바텀업 모달임 

import styled, { keyframes } from 'styled-components'
import {useState, useEffect} from 'react';

import ModalPortal from 'components/modal/PortalWrapper';


import { CommentType } from 'types/comment';
import { CommentSaveApi, CommentListApi } from 'pages/api/quiz';
import { useInput } from 'hooks';

import { useSelector } from 'react-redux';
import { RootState } from 'store';
import CommentList from 'components/comment/CommentList';

interface CommentModalProps{
  onCloseModal:()=> void;
}

const CommentModal = ({onCloseModal}:CommentModalProps)=>{

  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const [commentInput, , commentInputClear, commentInputHandler] = useInput<string>('');


  const { isLoggedin, userId } = useSelector((state: RootState) => state.user);
  const { quizSetId } = useSelector((state: RootState) => state.solve);
  const { solveUserName } = useSelector((state: RootState) => state.user_solve);

  const [animation, setAnimation] = useState('openAnimation');

  const close = () => {
    setAnimation('closeAnimation');
    setTimeout(() => {
      onCloseModal();
    }, 390);
  };


  const fetchCommentList = async () => {
    try {
      const res = await CommentListApi(quizSetId);
      parseCommentList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const parseCommentList = (data: any) => {
    const _commentList = data.map((comment: any) => {
      const _comment: CommentType = {
        nickname: comment.nickname,
        content: comment.content,
        createdAt: comment.created_at,
        user: comment.user && { nickname: comment.user.nickname, profileImg: comment.user.profile_img },
      };
      return _comment;
    });
    setCommentList(_commentList);
  };

  const saveComment = async() => {
    try {
      const res = await CommentSaveApi(solveUserName, commentInput, quizSetId, isLoggedin && userId);
      parseCommentList(res.data);
      commentInputClear();
    } catch (err) {
      console.log(err);
    }
};

useEffect(() => {
  fetchCommentList();
}, [quizSetId]);

  return (

  <ModalPortal wrapperId="react-portal-modal-container">
  <Background onClick={close}>
    <ModalWrapper onClick={(e) => e.stopPropagation()} className={animation}>
      <GrabBar />
      <MarginTop>
        {commentList && <CommentList commentList={commentList} />}
        <CommentInputContainer>
          <input type="text" value={commentInput} onChange={commentInputHandler} id='comment-input' maxLength={50} placeholder='한줄평 남기기..'/>
          <button  disabled={commentInput.length === 0 } onClick={saveComment}>등록</button>
        </CommentInputContainer>
      </MarginTop>
    </ModalWrapper>
  </Background>
</ModalPortal>)
}

const MarginTop = styled.div`
    margin-top:40px;


`

const CommentInputContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
  z-index: 1;
  border-top:solid 1px #eee;

  input {
    background-color: #f4f4f4;
    margin-left: 10px;
    margin-right: 3%;
    outline: none;
    flex-grow: 1;
    height: 51px;
    border: none;
    padding: 0 5%;
    color: #888;
    border-radius: 12px;
    font-size: 1rem;
    ::placeholder {
      color: #757575;
    }
  }
  button {
    position: absolute;
    word-break: keep-all;
    height: 38px;
    right: calc(3% + 8px);
    border: none;
    padding: 0 20px;
    font-weight: 500;
    font-size: 1rem;
    color: #fff;
    border-radius: 12px;
    background-color: #212121;
    cursor:pointer;
    &:disabled{
      background-color: #ccc;
    }
  }
`;


const Background = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  top: 0;
  width: 480px;
  @media (max-width: 480px) {
    width: 100%;
  }
  transform: translate(-50%, 0%);
  height: 100vh;
  background: #56565650;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: end;
  overflow: hidden;
`;

const BottomUp = keyframes` 
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }

`;
const TopDown = keyframes` 
      0% {
    transform: translateY(0);
  }
  100% {
        transform: translateY(100%);
  }

`;

const ModalWrapper = styled.div`
  z-index: 99;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 1.5rem 2rem 1.5rem 2rem;

  width: 100%;
  height: 80vh;

  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.openAnimation {
    animation: ${BottomUp} 0.4s ease-out;
  }
  &.closeAnimation {
    animation: ${TopDown} 0.4s ease-in-out;
  }
`;

const GrabBar = styled.div`
  width: 50px;
  height: 5px;
  border-radius: 12px;
  background-color: #eee;
  cursor: pointer;
`;

export default CommentModal;
