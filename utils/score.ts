import { useRouter } from 'next/router';
import { SaveScoreApi } from 'pages/api/quiz';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveEmotionCount } from 'store/emotion';

/**  비동기로 풀이자 닉네임과 점수를 서버에 저장을 요청하는 함수 */
const saveScore = async (_nickname: string) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizSetId, quizList } = useSelector((state: RootState) => state.solve);
  const { solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { isLoggedin, userId } = useSelector((state: RootState) => state.user);

  try {
    const res = await SaveScoreApi(
      _nickname,
      solveUserScore,
      quizSetId,
      isLoggedin ? userId : undefined,
      quizList.length,
    );
    const { quizset_emotion, solver_id } = res.data;
    dispatch(saveEmotionCount({ quizSetEmotion: quizset_emotion }));
    router.push(`/quiz/solve/${quizSetId}/result/${solver_id}`);
  } catch (err) {
    console.log(err);
  }
};
export default saveScore;
