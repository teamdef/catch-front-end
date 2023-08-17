import { QuizUploadApi } from 'pages/api/quiz';
import { LargeContainedBtn } from 'components/style/button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveProblemsAction, saveProblemSetTitleAction, saveProblemDescriptionAction } from 'store/quiz';
import { Loading } from 'components/common';
import checkQuizSet from 'utils/checkQuizSet';

interface CreateQuizSetBtnProps {
  _quizList: (TextQuiz | ImageQuiz)[];
}
const CreateQuizSetBtn = ({ _quizList }: CreateQuizSetBtnProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizList, setTitle, description } = useSelector((state: RootState) => state.quiz);
  const { userId } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false); // 로딩중 표시

  // redux store 자체를 초기화
  const resetReduxProblemSet = () => {
    dispatch(saveProblemDescriptionAction({ description: '' })); // 설명 저장
    dispatch(saveProblemSetTitleAction({ setTitle: '' })); // 제목 저장
    dispatch(saveProblemsAction({ quizList: [] })); // 빈 배열로 초기화
  };

  const publicationProblemSet = async () => {
    setLoading(true);
    try {
      if (checkQuizSet(_quizList)) {
        const res = await QuizUploadApi(quizList, userId, setTitle, description);
        resetReduxProblemSet();
        router.push({
          pathname: '/quiz/create/share',
          query: {
            quizSetTitle: setTitle,
            quizSetCount: quizList.length,
            quizSetThumb: res.data.quizset_thumb,
            quizSetId: res.data.quizset_id,
          },
        }); // 문제집 생성 완료 및 공유 화면으로 이동
      }
    } catch (err) {
      alert(`퀴즈 저장에 실패했습니다. 다시 확인해주세요.`);
    } finally {
      setLoading(false); // 로딩 해제
    }
  };
  if (loading) return <Loading text="퀴즈 저장중입니다." />;
  return <LargeContainedBtn onClick={publicationProblemSet}>퀴즈 생성 완료</LargeContainedBtn>;
};

export default CreateQuizSetBtn;
