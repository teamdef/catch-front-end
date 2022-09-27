import { ReactElement } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { MdContentCopy } from 'react-icons/md';

const Page: NextPageWithLayout = () => {
  const { setTitle } = useSelector((state: RootState) => state.quiz);
  const shareLink = 'http://localhost:3000/problem/어쩌구저쩌구';
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };
  return (
    <Wrapper>
      <div id="inner-wrapper">
        <h1>COMPLETE ! </h1>
        <p>출제자의 닉네임으로 문제집이 생성되었습니다</p>
        <div>{setTitle}</div>
        <p>
          {shareLink}
          <button
            onClick={() => {
              handleCopyClipBoard(shareLink);
            }}
          >
            <MdContentCopy />
          </button>
        </p>

        <button>퀴즈 링크 공유</button>
        <button>홈으로</button>
      </div>
    </Wrapper>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  position: relative;
  background-color: #fff6f7;
  height: 100vh;
  padding: 1rem;
  #inner-wrapper {
    background-color: white;
    height: 100%;
    border-radius: 30px;
    padding: 1rem;
    overflow-y: scroll;
    & {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
`;
export default Page;
