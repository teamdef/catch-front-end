import styled from 'styled-components';
import { MarkChoiceProps } from './MarkChoiceText';

const MarkChoiceImage = ({ choices, answerObj }: MarkChoiceProps) => {
  const { correct, user } = answerObj;
  const imageCard = (src: string, _index: number) => {
    if (correct === _index) return <CorrectImage key={_index} src={src} />;
    if (user === _index && user !== correct) return <UserAnswerImage key={_index} src={src} />;
    return <WrongImage key={_index} src={src} />;
  };
  return <Wrapper>{choices.map((choice: string, index: number) => imageCard(choice, index))}</Wrapper>;
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  margin-top: 20px;
  div {
    position: relative;
    width: 100%;
    aspect-ratio: 152/138;
    padding: 0;
    border-radius: 8px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      z-index: 1;
    }
  }
`;
const CorrectImage = styled.div<{ src: string }>`
  background-image: ${({ src }) => `url(${src})`};
  background-color: rgba(0, 0, 0, 0.4);
  background-blend-mode: multiply;
  border: 1px solid ${({ theme }) => theme.colors.primary_200};
  &::before {
    width: 39px;
    height: 29px;
    background: center no-repeat url(/assets/img/rebranding/icon/check_img.svg);
  }
`;
const UserAnswerImage = styled.div<{ src: string }>`
  background-image: ${({ src }) => `url(${src})`};
  border: 1px solid ${({ theme }) => theme.colors.error_1};
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: multiply, normal;
  &::before {
    width: 36px;
    height: 36px;
    background: center no-repeat url(/assets/img/rebranding/icon/wrong.svg);
  }
`;
const WrongImage = styled.div<{ src: string }>`
  background-image: ${({ src }) => `url(${src})`};
  border: 1px solid ${({ theme }) => theme.colors.error_1};
`;
export default MarkChoiceImage;
