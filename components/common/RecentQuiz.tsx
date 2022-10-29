import { useState, useEffect, useRef, useCallback } from 'react';
import { QuizCard, SkeletonQuizCard, NotFound,AdsQuizCard } from 'components/common';
import styled from 'styled-components';
import { RecentQuizListApi } from 'pages/api/test';

interface RecentQuizType {
  created_at: string;
  id: string;
  profile_img: string;
  nickname: string;
  set_title: string;
  solverCnt: number;
  thumbnail: string | null;
}
const RecentQuizList = () => {
  const [recentQuizList, setRecentQuizList] = useState<RecentQuizType[] | null>(null);

  /* infinite scroll 구현을 위한 것 */

  //const obsRef = useRef(null); //observer Element
  //const preventRef = useRef(true); //옵저버 중복 실행 방지
  const [end,setEnd] = useState(false); //모든 글 로드 확인
  const [load, setLoad] = useState(false); //로딩
  const [page, setPage] = useState<number>(0); // 내부 사용용 page 카운트
  const timeForToday = (date: string) => {
    const today = new Date();
    const timeValue = new Date(date);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTimeHour / 24);

    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }
    const betweenTimeWeek = Math.floor(betweenTimeDay / 7);
    if (betweenTimeWeek < 4) {
      return `${betweenTimeWeek}주전`;
    }

    const betweenTimeMonth = Math.floor(betweenTimeDay / 30);
    if (betweenTimeMonth < 12) {
      return `${betweenTimeMonth}달전`;
    }

    const value = today.toISOString().substring(0, 10);
    return value;
  };

  const getRecentQuizList = useCallback(
    async (lastCreatedAt?: string) => {
      setLoad(true);
      const res = await RecentQuizListApi(lastCreatedAt);
      if (res?.data?.length === 0) {
        setEnd(true);
        // 응답 데이터가 없다면. 즉, 마지막 페이지 라면?
      } else {
        let _quizList = res.data.map((quiz: RecentQuizType) => {
          let returnObj = { ...quiz };
          returnObj.thumbnail = quiz.thumbnail === '' ? null : quiz.thumbnail;
          returnObj.solverCnt = Number(quiz.solverCnt);
          return returnObj;
        });
        
        if (recentQuizList) {
          setRecentQuizList([...recentQuizList, ..._quizList]);
        } else {
          setRecentQuizList(_quizList);
        }
      }
      setLoad(false); //로딩 종료
    },
    [page],
  );

  // const onIntersection = (entries: any) => {
  //   const target = entries[0];
  //   if (!endRef.current && target.isIntersecting && preventRef.current) {
  //     //옵저버 중복 실행 방지
  //     preventRef.current = false; //옵저버 중복 실행 방지
  //     setPage((prev) => prev + 1); //페이지 값 증가
  //   }
  // };

  // useEffect(() => {
  //   getRecentQuizList(); // 문제 목록 불러오기
  //   //threshold 관찰요소와 얼만큼 겹쳤을 때 콜백을 수행하도록 지정하는 요소
  //   const observer = new IntersectionObserver(onIntersection, { threshold: 0.5 });
  //   if (obsRef.current) observer.observe(obsRef.current);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [obsRef]);

  useEffect(() => {
    getRecentQuizList();
  }, [])
  
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
            <NotFound title={'등록된 퀴즈집이 없습니다 😣'} subTitle={'퀴즈집을 만들어주세요 !! '} />
          ) : (
              <>
              {recentQuizList.map((quiz,index) => {
                return (
                  <>
                    {(index+1)/2===0 && <AdsQuizCard/>}
                    <QuizCard
                      key={quiz.id}
                      userName={quiz.nickname}
                      userProfileImg={quiz.profile_img}
                      quizDate={timeForToday(quiz.created_at)}
                      quizTitle={quiz.set_title}
                      quizCount={0}
                      quizPlay={quiz.solverCnt}
                      quizRoute={`/quiz/solve/${quiz.id}`}
                      quizThumbnail={quiz.thumbnail}
                    />
                  </>
                );
              })}
              {load && (
                <>
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                  <SkeletonQuizCard isthumb={false} />
                </>
              )}
              {!end && (
                <QuizLoad
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                >
                  더 불러오기
                </QuizLoad>
              )}
            </>
          )
        ) : (
          <>
            <SkeletonQuizCard isthumb={true} />
            <SkeletonQuizCard isthumb={false} />
            <SkeletonQuizCard isthumb={false} />
          </>
        )}
      </ListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Observer = styled.div`
  width: 100%;
  height: 150px;
`;
const QuizLoad = styled.button` 
  border:none;
  background-color:transparent;
  font-size:18px;
  font-weight:bold;
  padding:1rem;
  &:hover{
    cursor:pointer;
  }

`
const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export default RecentQuizList;
