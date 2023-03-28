import { useState, useEffect } from 'react';
import { QuizCard, SkeletonQuizCard, NotFound } from 'components/common';
import styled from 'styled-components';
import { RecentQuizListApi } from 'pages/api/quiz';
import { MdKeyboardArrowDown } from 'react-icons/md';

const RecentQuizList = () => {
  const [recentQuizList, setRecentQuizList] = useState<RecentQuizType[] | null>(null);
  const [paginationKey, setPaginationKey] = useState<any | null>(null);
  
  const [end, setEnd] = useState(false); //모든 글 로드 확인
  const [load, setLoad] = useState(false); //로딩 중 확인

  const fetchRecentQuizList = async () => {
    setLoad(true);
    try {
      const res = await RecentQuizListApi(paginationKey);
      const { pagination_key, recent_quizset } = res.data;
      parseRecentQuizList(recent_quizset);
      setPaginationKey(pagination_key);
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  const parseRecentQuizList = (data: any) => {
    const _recentQuizList = data.map((quizSet: any) => {
      const _quizObj: RecentQuizType = {
        id: quizSet.id,
        createdAt: quizSet.created_at,
        setTitle: quizSet.set_title,
        solverCnt: quizSet.solver_cnt,
        thumbnail: quizSet.thumbnail ?? null,
        user: { nickname: quizSet.user.nickname, profileImg: quizSet.user.profile_img },
      };
      return _quizObj;
    });
    attachQuizList(_recentQuizList);
  };

  /* pagination_key를 응답값으로 받으면 추가로 데이터를 더 조회할 수 있다. */
  const attachQuizList = (quizList: RecentQuizType[]) => {
    /* 기존에 로드한 퀴즈 목록이 있을 경우 */
    if (recentQuizList) {
      if (recentQuizList.length === 0) setEnd(true); /* 최초 로드를 하였으나 응답값이 없음 */
      setRecentQuizList([...recentQuizList, ...quizList]);
    } else {
      setRecentQuizList([...quizList]);
    }
  };

  /* 처음에는 pagination_key가 null로 설정되어있다. 더보기를 클릭하면 저장된 pagination_key로 추가 데이터를 불러온다.*/
  useEffect(() => {
    if (recentQuizList && !paginationKey) setEnd(true);
  }, [paginationKey]);

  useEffect(() => {
    fetchRecentQuizList();
  }, []);

  /* 컴포넌트 구조 개선하기 */
  return (
    <Wrapper>
      <ListWrapper>
        <PaddingBottom>
          {recentQuizList ? (
            recentQuizList.length === 0 ? (
              <NotFound title={'등록된 퀴즈 세트가 없습니다 😣'} subTitle={'퀴즈 세트를 만들어볼까요?'} />
            ) : (
              <>
                {recentQuizList.map((quiz) => {
                  return <QuizCard key={quiz.id} recentQuiz={quiz} />;
                })}
                {load && (
                  <>
                    <SkeletonQuizCard isthumb={false} />
                    <SkeletonQuizCard isthumb={false} />
                    <SkeletonQuizCard isthumb={false} />
                  </>
                )}
                {!end && (
                  <QuizLoad onClick={fetchRecentQuizList}>
                    <MdKeyboardArrowDown size={20} />
                    더보기
                  </QuizLoad>
                )}
              </>
            )
          ) : (
            <>
              <SkeletonQuizCard isthumb={false} />
              <SkeletonQuizCard isthumb={false} />
              <SkeletonQuizCard isthumb={false} />
            </>
          )}
        </PaddingBottom>
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
  width: 100%;
`;
export default RecentQuizList;
