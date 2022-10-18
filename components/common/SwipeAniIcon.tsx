import styled from 'styled-components';
import { BiChevronLeft } from 'react-icons/bi';
const SwipeAniIcon = () => {
  return (
    <IconEl>
      <SignLeft>
        <BiChevronLeft size="20" />
        <BiChevronLeft size="20" />
        <BiChevronLeft size="20" />
      </SignLeft>
      <img src={'/assets/img/clicker.png'} />
      <span>다음 문제로 이동</span>
    </IconEl>
  );
};
const IconEl = styled.div`
  @keyframes Pointer {
    0% {
      opacity: 0;
      transform: translateX(10px);
    }
    20% {
      opacity: 1;
      transform: translateX(10px);
    }
    40% {
      transform: translateX(10px) scale(.9);
      opacity: 1;
    }
    80% {
      transform: translateX(-10px) scale(.9);
    }
    100% {
      opacity: 0;
    }
  }
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.6rem;
  color: #aaa;
  img {
    width: 20px;
    height: 20px;
    animation: Pointer 2s infinite;
  }
  span {
    margin-top: 5px;
  }
`;
const SignLeft = styled.div`
  @keyframes Sign {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  position: relative;
  display: block;
  height: 20px;
  svg {
    position: absolute;
    right: 0;
    animation: Sign 0.5s linear infinite;
    animation-direction: alternate;
    animation-delay: 0.2s;
    &:nth-child(1) {
      right: -10px;
      animation-delay: 0.1s;
    }
    &:nth-child(2) {
      right: -20px;
      animation-delay: 0s;
    }
  }
`;

export default SwipeAniIcon;
