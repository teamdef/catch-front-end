import { useState, useEffect, useCallback } from 'react';
import { QuizCard, SkeletonQuizCard, NotFound } from 'components/common';
import styled from 'styled-components';
import { RecentQuizListApi } from 'pages/api/quiz';
import { MdKeyboardArrowDown } from 'react-icons/md';

const RecentQuizList = () => {
  const [recentQuizList, setRecentQuizList] = useState<QuizCardType[] | null>(null);
  const [end, setEnd] = useState(false); //모든 글 로드 확인
  const [load, setLoad] = useState(false); //로딩
  const [page, setPage] = useState<number>(0); // 내부 사용용 page 카운트

  const getRecentQuizList = useCallback(
    async (lastCreatedAt?: string) => {
      setLoad(true);
      const res = await RecentQuizListApi(lastCreatedAt);
      if (res?.data?.length === 0) {
        if (recentQuizList === null) {
          setRecentQuizList([]);
        }
        setEnd(true);
        // 응답 데이터가 없다면. 즉, 마지막 페이지 라면?
      } else {
        const _quizList = res.data;
        setRecentQuizList(recentQuizList ? [...recentQuizList, ..._quizList] : _quizList);
      }
      setLoad(false); //로딩 종료
    },
    [page],
  );

  useEffect(() => {
    getRecentQuizList();
  }, []);

  useEffect(() => {
    if (recentQuizList && recentQuizList.length !== 0) {
      const { created_at } = recentQuizList?.slice(-1)[0];
      let _creaetedAt = created_at.replace('T', ' ');
      _creaetedAt = _creaetedAt.replace('Z', '');
      getRecentQuizList(_creaetedAt); // 문제 목록 불러오기
    }
  }, [page]);

  return (
    <Wrapper>
      <ListWrapper>
        {recentQuizList ? (
          recentQuizList.length === 0 ? (
            <PaddingBottom>
              <NotFound title={'등록된 퀴즈 세트가 없습니다 😣'} subTitle={'퀴즈 세트를 만들어주세요 !! '} />
            </PaddingBottom>
          ) : (
            <>
              {recentQuizList.map((quiz) => {
                return (
                  <>
                    <QuizCard key={quiz.id} recentQuiz={quiz}  />
                  </>
                );
              })}
              {load && (
                <PaddingBottom>
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                </PaddingBottom>
              )}
              {!end && (
                <QuizLoad
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                >
                  <MdKeyboardArrowDown size={20} />
                  더보기
                </QuizLoad>
              )}
            </>
          )
        ) : (
          <PaddingBottom>
            <SkeletonQuizCard isthumb={false} />
            <SkeletonQuizCard isthumb={false} />
            <SkeletonQuizCard isthumb={false} />
          </PaddingBottom>
        )}
      </ListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const QuizLoad = styled.button`
  border: none;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 14px;
  font-weight: bold;
  color: #595959;
  padding-bottom: 40px;
  padding-top: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const PaddingBottom = styled.div`
  padding-bottom: 80px;
  width:100%;
`;
export default RecentQuizList;
