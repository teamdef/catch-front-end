/* react, next 관련 */
import { ReactElement, useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { useModal } from 'hooks';
import { useRouter } from 'next/router';
/* redux 관련 */
import { useDispatch, useSelector } from 'react-redux';
import { saveProblemsAction, saveProblemSetTitleAction, saveProblemDescriptionAction } from 'store/quiz';
import { RootState } from 'store';
/* 통신 */
import { AxiosResponse } from 'axios';
import { QuizUploadApi } from 'pages/api/quiz';
/* 컴포넌트 */
import { Loading } from 'components/common';
import { AppLayout, HeaderLayout } from 'components/layout';

import { LargeContainedBtn } from 'components/style/button';
import { theme } from 'styles/theme';
import Sketchbook from 'components/style/Sketchbook';
import QuizSetInput from 'components/partials/create/QuizSetInput';
import styled from 'styled-components';
import AddQuizBtn from 'components/partials/create/AddQuizBtn';
import CreateQuizList from 'components/partials/create/CreateQuizList';
import checkQuizSet from 'utils/checkQuizSet';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.user);
  const { setTitle, quizList, description } = useSelector((state: RootState) => state.quiz);
  const [loading, setLoading] = useState<boolean>(false); // 로딩중 표시
  const [_quizList, _setQuizList] = useState<(TextQuiz | ImageQuiz)[]>([]); // 문제 내부 저장 배열

  /* 모달 관리 */
  const [openContinueModal, , ,] = useModal({
    // yesTitle: '이어서',
    // noTitle: '새롭게',
    // noAction: () => {
    //   resetLocalProblemSet();
    // },
    contents: (
      <div>
        <div>
          제작하던 <strong style={{ color: '#ff4d57' }}>{setTitle}</strong>
          <br />
          퀴즈 세트가 있습니다
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>이어서 제작하시겠습니까?</div>
      </div>
    ),
  });

  // redux store 자체를 초기화
  const resetReduxProblemSet = () => {
    dispatch(saveProblemDescriptionAction({ description: '' })); // 설명 저장
    dispatch(saveProblemSetTitleAction({ setTitle: '' })); // 제목 저장
    dispatch(saveProblemsAction({ quizList: [] })); // 빈 배열로 초기화
  };

  // const resetLocalProblemSet = () => {
  //   _setDescription('');
  //   _setQuizList([]);
  //   titleClear();
  // };
  // const quizListHandler = (_params: (TextQuiz | ImageQuiz)[]) => {
  //   _setQuizList(_params);
  // };

  // 문제집 생성하기 ( 서버에 저장하기 )
  const publicationProblemSet = async () => {
    setLoading(true);
    try {
      // 문제 저장 조건 체크
      if (checkQuizSet(_quizList)) {
        QuizUploadApi(quizList, userId, setTitle, description).then((res: AxiosResponse) => {
          resetReduxProblemSet(); // 문제집 redux 초기화
          router.push({
            pathname: '/quiz/create/share',
            query: {
              quizSetTitle: setTitle,
              quizSetCount: quizList.length,
              quizSetThumb: res.data.quizset_thumb,
              quizSetId: res.data.quizset_id,
            },
          }); // 문제집 생성 완료 및 공유 화면으로 이동
        });
      }
    } catch (err) {
      alert(`퀴즈 저장에 실패했습니다. 다시 확인해주세요.`);
    } finally {
      setLoading(false); // 로딩 해제
    }
  };

  // 기존에 제작하던 퀴즈 세트의 유무를 확인하고 팝업을 띄운다.
  useEffect(() => {
    if (quizList.length !== 0) {
      // 제작 중이던 문제가 있을 경우
      openContinueModal();
    }
    if (quizList) {
      _setQuizList(quizList);
    }
    // titleSetter(setTitle); // 퀴즈 세트 제목 세팅
  }, []);
  // 퀴즈 세트 문항 변경 사항 바로 redux에 저장
  useEffect(() => {
    dispatch(saveProblemsAction({ quizList: _quizList }));
  }, [_quizList]);

  if (loading) return <Loading text="퀴즈 세트를 저장하고 있습니다!" />;
  return (
    <Sketchbook>
      <Wrapper>
        {/* <RenderContinueModal /> */}
        <QuizSetInput />
        <CreateQuizList quizList={_quizList} setQuizList={_setQuizList} />
        <AddQuizBtn setQuizList={_setQuizList} />
        <LargeContainedBtn onClick={publicationProblemSet}>퀴즈 생성 완료</LargeContainedBtn>
      </Wrapper>
    </Sketchbook>
  );
};
const Wrapper = styled.div`
  border: 0;
  font-weight: ${theme.fontWeight.bold};
  &::placeholder {
    font-weight: ${theme.fontWeight.regular};
  }
  color: ${theme.colors.blackColors.grey_900};
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.primary_bg}>
      <HeaderLayout bgColor={theme.colors.primary_bg}>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
