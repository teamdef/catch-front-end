import styled, { keyframes, css } from 'styled-components';
import { Card } from 'components/common';

export const Background = styled.div`
  position: relative;
  background-color: #fff6f7;
`;

export const RecentQuizList = styled.div`
  padding: 1rem;
  background-color: #fff;
  #section-title {
    /*padding: 1rem 0.5rem 1rem 0.5rem;*/
    padding-top:1rem;
    color: #595959;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    a {
      font-weight: 400;
      display: flex;
      align-items: center;
      color: #ff4d57;
      svg {
        margin-left: 4px;
      }
    }
  }
  #section-contents {
    width: 100%;
    margin: 0 auto;
  }
`;
interface ImageCardProps {
  url: string | null;
}

export const MyQuizList = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  #title {
    padding: 1rem 0 1.5rem 0rem;
    color: #595959;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }
  .swiper-wrapper {
    padding-bottom: 2rem;
  }
  .swiper-pagination {
    position: relative;
    .swiper-pagination-bullet {
      width: 16px;
      height: 16px;
      &:last-child {
        background-color: #ffa5aa;
        position: relative;
        &:after {
          content: '+';
          color: #fff;
          font-size: 17px;
          position: absolute;
          top: -1px;
          right:3px;
        }
      }
    }
    .swiper-pagination-bullet-active {
      background-color: #ff4d57;
    }
  }
`;

export const CustomCard = styled(Card)`
  height: 18rem;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
`;
export const CreateCard = styled(CustomCard)`
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    position: relative;
    display: block;
    color: #595959;
    font-size: 16px;
  }
  button {
    background-color: #ff4d57;
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
    color: #fff;
    font-weight: 500;
    padding: 0.75rem 1.75rem 0.75rem 1.75rem;
    margin-top: 50px;
    &:hover {
      cursor: pointer;
    }
  }
`;
export const MyQuizCard = styled(CustomCard)<ImageCardProps>`
  ${(props) =>
    props.url
      ? css`
          background: linear-gradient(
              to bottom,
              rgba(20, 20, 20, 0) 10%,
              rgba(20, 20, 20, 0.1) 25%,
              rgba(20, 20, 20, 0.25) 50%,
              rgba(20, 20, 20, 0.5) 75%,
              rgba(20, 20, 20, 0.75) 100%
            ),
            url(${props.url});
          background-size: cover;
        `
      : css`
          background: url('/assets/img/catch_character4.jpg');
          background-size: cover;
          background-repeat: no-repeat;
        `}

  flex-direction: column;
  justify-content: flex-end;
  color: ${(props) => (props.url ? '#fff' : '#595959')};
  padding: 1.5rem;
  #quiz-title {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom:8px;
  }
  #quiz-info {
  }
  #quiz-detail-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    button {
      border-radius: 30px;
      border: none;
      padding: 0.5rem 1rem 0.5rem 1rem;
      color: #595959;
      color: ${(props) => (props.url ? '#595959' : '#fff')};
      background-color: ${(props) => (props.url ? 'none' : '#ff4d57')};
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export const gradient = keyframes` 
  0% {background-color: rgba(165, 165, 165, 0.1);}
  50% {background-color: rgba(165, 165, 165, 0.3);}
  100% {background-color: rgba(165, 165, 165, 0.1);}
`;

export const SkeletonMyQuizCard = styled(MyQuizCard)`
  background: none;
  background-color: #eee;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  #quiz-title {
    animation: ${gradient} 1.5s linear infinite alternate;
    height: 30px;
    background-color: #d6d6d6;
    width: 300px;
    font-weight: 500;
    border-radius: 25px;
  }
  #quiz-info {
    animation: ${gradient} 1.5s linear infinite alternate;
    height: 16px;
    width: 200px;
    margin-top: 4px;
    border-radius: 25px;
    background-color: #d6d6d6;
  }
  #quiz-detail-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    div {
      animation: ${gradient} 1.5s linear infinite alternate;
      border-radius: 25px;
      padding: 0.5rem 1rem 0.5rem 1rem;
      background-color: #d6d6d6;
      height: 40px;
      width: 110px;
    }
  }
`;
