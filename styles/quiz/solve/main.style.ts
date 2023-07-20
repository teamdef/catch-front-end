import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

export const QuizUnsolved = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  z-index: 99999;
  p {
    padding-right: 3%;
    padding-top: 24px;
    position: absolute;
    right: 0;
    span {
      color: #ff4d57;
      font-weight: bold;
    }
  }
`;
export const QuizSolveCard = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 65px;
  margin-bottom: 56px;
  & + & {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 186px;
  }
  padding: 0 4%;
  flex-direction: column;
  flex-wrap: nowrap;
`;

export const QuizTitle = styled.div`
  display: flex;
  color: #000;
  font-size: ${({ theme }) => theme.fontSize.body_2};
  font-weight: 700;
  line-height: 130%; /* 18.2px */
  letter-spacing: -0.7px;
  margin-left: 4px;
`;

export const QuizCount = styled.span`
  margin-right: 12px;
  flex: none;
`;

export const QuizImageWrapper = styled.img`
  margin-top: 12px;
  width: 100%;
  height: 185px;
  object-fit: contain;
  border-radius: 4px;
`;

export const QuizSolveContent = styled.div`
  @keyframes Bounce {
    0% {
      transform: translateY(-30px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes Right {
    0% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
  margin-top: 95px;
  margin-bottom: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ChoiceWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`;
export const ChoiceImgWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  margin-top: 20px;
`;
export const ChoiceImgLabel = styled.label<{ imgSrc: string }>`
  position: relative;
  width: 100%;
  height: 150px;
  padding: 0;
  border-radius: 15px;
  overflow: hidden;
  object-fit: cover;
  background: center / contain no-repeat url(${({ imgSrc }) => imgSrc || ''});
`;

export const ChoiceImgInput = styled.input`
  display: none;
  &:checked + ${ChoiceImgLabel} {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    background-blend-mode: multiply;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 39px;
      height: 29px;
      background: center no-repeat url(/assets/img/rebranding/icon/check_img.svg);
      z-index: 1;
    }
  }
`;
export const ChoiceTextLabel = styled.label`
  width: 100%;
  padding: 22px 24px;
  font-size: ${({ theme }) => theme.fontSize.body_2};
  font-weight: 400;
  line-height: normal;
  border: 1px solid ${({ theme }) => theme.colors.secondary_500};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.secondary_500};
`;
export const ChoiceTextInput = styled.input`
  display: none;
  &:checked + ${ChoiceTextLabel} {
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.secondary_500};
    color: #fff;
    &::before {
      content: '';
      position: absolute;
      right: 24px;
      display: block;
      width: 18px;
      height: 14px;
      background-image: url(/assets/img/rebranding/icon/check_text.svg);
    }
  }
`;
export const QuizGuide = styled.span`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;
export const QuizSolveBottom = styled.div`
  @keyframes Bounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-60px);
    }
  }
  position: fixed;
  max-width: 480px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  display: flex;
  z-index: 1;
  button {
    position: relative;
    display: flex;
    margin: 0 3%;
    transform: translateY(0);
    transition: transform 0.5s;
    &.on {
      transform: translateY(-80px);
    }
    span {
      font-size: 1.2rem;
    }
    align-items: center;
  }
`;
