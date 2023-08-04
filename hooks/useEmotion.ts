import { useRouter } from 'next/router';
import { EmotionClickApi, QuizSolverResultApi } from 'pages/api/quiz';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveEmotionCount } from 'store/emotion';
import useDebounce from './useDebounce';

const useEmotion = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const quizSetEmotion = useSelector((state: RootState) => state.emotion);
  const { quizset_id, solver_id } = router.query; // [quizset_id]/result/[solver_id] 형태의 src에서 사용 가능
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType | null>(null);
  const [emotionList, setEmmotionList] = useState<QuizSetEmotionType>(quizSetEmotion);

  const emotionHandler = (isDiff: boolean, _newEmotion: EmotionType) => {
    if (isDiff) setCurrentEmotion(_newEmotion);
    else setCurrentEmotion(null);
  };

  const getCurrentEmotion = async () => {
    try {
      const res = await QuizSolverResultApi(quizset_id as string, solver_id as string);
      setCurrentEmotion(res.data.emotion as EmotionType);
      console.log(res.data.emotion);
    } catch (e) {
      console.log(e);
    }
  };

  const emotionObjHandler = (emotion: EmotionType) => {
    const isDiff = currentEmotion !== emotion;
    const currentList = { ...emotionList };
    if (isDiff && !currentEmotion) {
      currentList[emotion] += 1;
    } else if (isDiff && currentEmotion) {
      currentList[emotion] += 1;
      currentList[currentEmotion] -= 1;
    } else if (!isDiff) {
      currentList[emotion] -= 1;
    }
    setEmmotionList(currentList);
    emotionHandler(isDiff, emotion);
    delayChangesSave(emotion);
  };

  const emotionChangesSave = async (emotion: EmotionType) => {
    const res = await EmotionClickApi(emotion, quizset_id as string, solver_id as string);
    dispatch(saveEmotionCount({ quizSetEmotion: res.data }));
    console.log('api 통신! current :', res.data);
  };

  const delayChangesSave = useDebounce(emotionChangesSave, 500);

  useEffect(() => {
    if (!!quizset_id && !!solver_id) getCurrentEmotion();
  }, [router.isReady]);

  return { currentEmotion, emotionList, emotionObjHandler };
};

export default useEmotion;
