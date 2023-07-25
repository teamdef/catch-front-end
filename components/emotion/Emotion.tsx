import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { saveEmotionCount } from 'store/emotion';
import { EmotionClickApi, QuizSolverResultApi } from 'pages/api/quiz';
import { useRouter } from 'next/router';

interface EmotionComponentType {
  name: string;
  value: EmotionType;
}

const Emotion = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const quizSetEmotion = useSelector((state: RootState) => state.emotion);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType | null>(null);

  const { quizset_id, solver_id } = router.query; // [quizset_id]/result/[solver_id] 형태의 url에서 사용 가능

  const EmotionList: EmotionComponentType[] = [
    { name: '재밌네요?', value: 'FUNNY' },
    { name: '쉬워요', value: 'EASY' },
    { name: '어려운데요', value: 'HARD' },
    { name: '주인장나와', value: 'ANGRY' },
  ];
  const emotionClick = async (emotion: EmotionType) => {
    try {
      const res = await EmotionClickApi(emotion, quizset_id as string, solver_id as string);
      emotionChangesSave(res.data);
      emotionChangesClick(currentEmotion, emotion);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentEmotion = async () => {
    try {
      const res = await QuizSolverResultApi(quizset_id as string, solver_id as string);
      setCurrentEmotion(res.data.emotion as EmotionType);
    } catch (e) {
      console.log(e);
    }
  };

  const emotionChangesClick = (prevEmotion: EmotionType | null, _currentEmotion: EmotionType) => {
    setCurrentEmotion(prevEmotion === _currentEmotion ? null : _currentEmotion);
  };

  const emotionChangesSave = (quizset_emotion: QuizSetEmotionType) => {
    dispatch(saveEmotionCount({ quizSetEmotion: quizset_emotion }));
  };

  useEffect(() => {
    if (!!quizset_id && !!solver_id) getCurrentEmotion();
  }, [router.isReady]);
  return (
    <EmotionBox>
      {EmotionList.map((emotion: EmotionComponentType) => {
        return (
          <EmotionButton
            onClick={() => {
              emotionClick(emotion.value);
            }}
            active={currentEmotion === emotion.value}
          >
            {currentEmotion === emotion.value ? (
              <img
                src={`/assets/img/emotion_svg/emotion_${emotion.value}_active.svg`}
                alt={`${emotion.name} 이모티콘 클릭`}
              />
            ) : (
              <img src={`/assets/img/emotion_svg/emotion_${emotion.value}.svg`} alt={`${emotion.name} 이모티콘`} />
            )}

            <p className="emotion-name">{emotion.name}</p>
            <span className="emotion-count">{quizSetEmotion[emotion.value]}</span>
          </EmotionButton>
        );
      })}
    </EmotionBox>
  );
};
const EmotionBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 16px;
`;

const EmotionButton = styled.button<{ active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0;
  width: 52px;
  padding: 0;
  background-color: transparent;
  color: ${({ active }) => (active ? '#ff4d57' : '#212121')};
  font-weight: ${({ active }) => (active ? 'bold' : 'none')};
  cursor: pointer;
  svg {
    border: solid 1px red;
  }
  .emotion-name {
    position: relative;
    display: block;
    margin-top: 10px;
    font-size: 11px;
    white-space: nowrap;
  }
  .emotion-count {
    position: relative;
    display: block;
    font-size: 14px;
  }
`;
export default Emotion;
