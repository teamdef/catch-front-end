import type { ReactElement, ChangeEvent } from 'react';
import { useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Title, QuizCard } from 'components/common';
import styled from 'styled-components';
import { MdOutlineSearch } from 'react-icons/md';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
const Page: NextPageWithLayout = () => {
  const [dateSort, setDateSort] = useState<boolean>(true); // true 최신순, false 오래된순

  const dateSortHandler = () => {
    setDateSort(!dateSort);
  };
  return (
    <>
      <Title title="최근 생성된 문제" subTitle="최근 생성된 문제집 목록을 확인하세요!  🔎 🤔" />
      <Wrapper>
        <OptionWrapper>
          <SortButton onClick={dateSortHandler}>
            {dateSort ? (
              <div>
                <FaSortUp />
                최신순
              </div>
            ) : (
              <div>
                <FaSortDown />
                오래된순
              </div>
            )}
          </SortButton>

          <SearchBar>
            <MdOutlineSearch size={20} />
            <input type="text" placeholder="문제집 명, 출제자 명 ..." />
          </SearchBar>
        </OptionWrapper>
        <ListWrapper>
          <QuizCard
            userName="전하영"
            quizDate="6일전"
            quizTitle="메이플스토리 몬스터 퀴즈"
            quizCount={10}
            quizPlay={365}
            quizRoute="/home"
            quizThumbnail="https://t1.daumcdn.net/cfile/tistory/205419184B3C998139"
          />
          <QuizCard
            userName="배광호"
            quizDate="12일전"
            quizTitle="haha ha 고양이 이름 맞추기"
            quizCount={6}
            quizPlay={111}
            quizRoute="/home"
            quizThumbnail="https://thumbs.gfycat.com/PoshBountifulAndalusianhorse-size_restricted.gif"
          />
          <QuizCard
            userName="진현우"
            quizDate="14일전"
            quizTitle="팡머가 좋아하는 것들"
            quizCount={7}
            quizPlay={19}
            quizRoute="/home"
          />
          <QuizCard
            userName="장원석"
            quizDate="18일전"
            quizTitle="주호민 파괴왕 업적 맞추기"
            quizCount={5}
            quizPlay={44}
            quizRoute="/home"
            quizThumbnail="http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2021/08/25/5H2SPdjC8oEh637654501997865235.jpg"
          />
        </ListWrapper>
      </Wrapper>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5rem;
`;

const SortButton = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px #d6d6d6;
  border-radius: 25px;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 14px;
  @media (max-width: 400px) {
    font-size: 12px;
    width: 130px;
  }
  svg {
    margin-right: 4px;
  }
`;
const OptionWrapper = styled.div`
  margin: 0 auto;
  margin-top: 1.5rem;
  display: flex;
  width:95%;
`;
const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 25px;
  margin-left: 0.5rem;
  width: 100%;
  svg {
    color: #888;
  }
  input {
    width: 100%;
    color: #595959;
    &::placeholder {
      color: #acacac;
    }
    border: none;
    background-color: transparent;
    outline: none;
    margin-left: 0.25rem;
  }
`;
export default Page;
