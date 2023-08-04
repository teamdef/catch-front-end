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
  src: string;
}

const EmotionList: EmotionComponentType[] = [
  {
    name: '재밌네요?',
    value: 'FUNNY',
    src: '/assets/img/rebranding/emotion/off1.svg',
  },
  {
    name: '쉽네요',
    value: 'EASY',
    src: '/assets/img/rebranding/emotion/off2.svg',
  },
  {
    name: '어려운데요',
    value: 'HARD',
    src: '/assets/img/rebranding/emotion/off3.svg',
  },
  {
    name: '주인장나와',
    value: 'ANGRY',
    src: '/assets/img/rebranding/emotion/off4.svg',
  },
];

const Emotion = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizset_id, solver_id } = router.query; // [quizset_id]/result/[solver_id] 형태의 src에서 사용 가능

  const quizSetEmotion = useSelector((state: RootState) => state.emotion);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType | null>(null);

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
      {EmotionList.map((emotion: EmotionComponentType, idx: number) => {
        const isActive = currentEmotion === emotion.value;
        return (
          <EmotionButton key={idx} onClick={() => emotionClick(emotion.value)} active={isActive}>
            <EmotionImage src={emotion.src} alt="이모티콘이미지" active={isActive} />
            <EmotionName>{emotion.name}</EmotionName>
            <EmotionCount>{quizSetEmotion[emotion.value]}</EmotionCount>
          </EmotionButton>
        );
      })}
    </EmotionBox>
  );
};
const EmotionBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 44px;
  margin-bottom: 28px;
`;

const EmotionButton = styled.button<{ active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0;
  width: 12.8%;
  color: ${({ active, theme }) => (active ? theme.colors.secondary_500 : theme.colors.blackColors.grey_900)};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  cursor: pointer;
`;
const EmotionImage = styled.img<{ active: boolean }>`
  width: 100%;
  border: 0.25px solid ${({ active, theme }) => (active ? theme.colors.secondary_300 : 'transparent')};
  box-shadow: ${({ active, theme }) => active && `0px 0px 10px -3px ${theme.colors.secondary_300}`};
  border-radius: 50%;
`;
const EmotionName = styled.p`
  position: relative;
  display: block;
  margin-top: 10px;
  font-size: 11px;
  white-space: nowrap;
`;
const EmotionCount = styled.span`
  position: relative;
  display: block;
  font-size: 14px;
`;
export default Emotion;
