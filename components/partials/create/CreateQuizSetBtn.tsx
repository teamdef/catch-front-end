import { QuizUploadApi } from 'pages/api/quiz';
import { LargeContainedBtn } from 'components/style/button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveProblemsAction, saveProblemSetTitleAction, saveProblemDescriptionAction } from 'store/quiz';
import { Loading } from 'components/common';

const CreateQuizSetBtn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizList, setTitle, description } = useSelector((state: RootState) => state.quiz);
  const { userId } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  const createQuizValid = (): boolean => {
    if (!quizList[0]) return false;
    if (quizList.find((quiz: TextQuiz | ImageQuiz) => quiz.quizTitle === '')) return false;
    if (quizList.find((quiz: TextQuiz | ImageQuiz) => quiz.choices.length < 2)) return false;
    return true;
  };

  const resetReduxProblemSet = () => {
    dispatch(saveProblemDescriptionAction({ description: '' }));
    dispatch(saveProblemSetTitleAction({ setTitle: '' }));
    dispatch(saveProblemsAction({ quizList: [] }));
  };

  const publicationProblemSet = async () => {
    setLoading(true);
    try {
      const res = await QuizUploadApi(quizList, userId, setTitle, description);
      resetReduxProblemSet();
      router.push(`/quiz/create/${res.data.quizset_id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // 로딩 해제
    }
  };
  if (loading) return <Loading text="퀴즈 저장 중 입니다." />;
  return (
    <LargeContainedBtn onClick={publicationProblemSet} disabled={!createQuizValid()}>
      퀴즈 생성 완료
    </LargeContainedBtn>
  );
};

export default CreateQuizSetBtn;
