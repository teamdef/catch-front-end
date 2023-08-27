import styled from 'styled-components';
import useEmotion from 'hooks/useEmotion';

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
  const { currentEmotion, emotionList, emotionObjHandler } = useEmotion();

  return (
    <EmotionBox>
      {EmotionList.map((emotion: EmotionComponentType, idx: number) => {
        const isActive = currentEmotion === emotion.value;
        return (
          <EmotionButton key={idx} onClick={() => emotionObjHandler(emotion.value)} active={isActive}>
            <EmotionImage src={emotion.src} alt="이모티콘이미지" active={isActive} />
            <EmotionName>{emotion.name}</EmotionName>
            <EmotionCount>{emotionList[emotion.value]}</EmotionCount>
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
  box-shadow: ${({ active, theme }) =>
    active ? `0px 0px 10px -3px ${theme.colors.secondary_300}` : '0px 0px 1px 0px #B099FE'};
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
