import styled from 'styled-components';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { RootState } from 'store';
import type { NextPageWithLayout } from 'pages/_app';
import { HeadMeta, MatchNote, Logo, Button, Comment } from 'components/common';
import { AiOutlineShareAlt } from 'react-icons/ai';
// import ProgressBar from '@ramonak/react-progress-bar';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  // let { solveId } = router.query;
  const { solveUserName, solveUserScore, solveProblems } = useSelector((state: RootState) => state.solve);
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const [openMatch, setOpenMatch] = useState<Boolean>(false);
  return (
    <Container>
      <HeadMeta />
      <Logo />
      <ScoreArea>
        <h1>
          <strong>{solveUserName}</strong> 님
        </h1>
        {/* <ProgressArea>
          <ProgressBar completed={`${solveUserScore}`} maxCompleted={solveProblems.length} bgColor={'#ff4d57'} />
        </ProgressArea> */}
        <UserScore>
          <b>{(solveUserScore / solveProblems.length) * 100}</b>
        </UserScore>
        <p>
          총 <span>{solveProblems.length}</span> 문제 중 <span>{solveUserScore}</span> 문제 맞았어요{' '}
        </p>
      </ScoreArea>
      <ButtonArea>
        <Button onClick={() => Router.push(`${isLoggedin ? '/quiz/create' : '/'}`)}>나도 만들기</Button>
        <Button onClick={() => setOpenMatch(true)}>오답 노트</Button>
      </ButtonArea>
      <ShareArea>
        <h2>
          <AiOutlineShareAlt />
          퀴즈세트를 공유해보세요 !
        </h2>
        <div>
          <ul>
            <li>
              <a href="">
                <img src="/assets/img/instagram_icon.png"></img>
              </a>
            </li>
            <li>
              <a href="">
                <img src="/assets/img/facebook_icon.png"></img>
              </a>
            </li>
            <li>
              <a href="">
                <img src="/assets/img/kakao.png"></img>
              </a>
            </li>
            <li>
              <a href="">
                <img src="/assets/img/share_icon.png"></img>
              </a>
            </li>
          </ul>
        </div>
      </ShareArea>
      <Comment />
      {/* <RankingArea>
        <h2>
          <strong>{solveUserName}</strong> 님의 랭킹을 확인해 보세요!
        </h2>
      </RankingArea> */}

      {openMatch ? <MatchNote setOpenMatch={setOpenMatch} /> : ''}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  a {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    padding: 5%;
  }
`;
const ButtonArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  gap: 3%;
  justify-content: center;
  align-items: center;
  button {
    width: 40%;
    height: 42px;
    font-size: 0.9rem;
    background-color: #ff4d57;
    color: #fff;
  }
`;
const ScoreArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  color: #595959;
  > h1 {
    font-size: 1rem;
    font-weight: normal;
    margin: 0 0 5%;
    strong {
      font-weight: 500;
      font-size: 1.5rem;
      font-weight: normal;
      color: #ff4d57;
    }
  }
  > p {
    color: #888;
    margin: 5% 0;
    span {
      color: #ff4d57;
    }
  }
  button {
    border: 2px solid #ff4d57;
  }
`;
const UserScore = styled.div`
  position: relative;
  b {
    position: relative;
    font-size: 3.5rem;
    color: #ff4d57;
    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      width: 110%;
      height: 4px;
      border-radius: 2px;
      background-color: #ff4d57;
    }
    &::after {
      width: 130%;
      bottom: -5px;
    }
  }
`;
const ShareArea = styled.div`
  position: relative;
  display: block;
  width: 80%;
  h2 {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
    font-size: 0.8rem;
    color: #888;
    font-weight: 400;
  }
  > div {
    position: relative;

    ul {
      position: relative;
      display: flex;
      justify-content: center;
      padding: 0;
      li {
        position: relative;
        margin: 0 4%;
        list-style: none;
        a {
          position: relative;
          width: 38px;
          height: 38px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
`;

// const ProgressArea = styled.div`
//   position: relative;
//   display: block;
//   width: 80%;
//   span {
//     padding: 0 15px !important;
//     display: none !important;
//   }
// `;
// const RankingArea = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   > h2 {
//     margin-top: 0;
//     font-weight: normal;
//     color: #888;
//     font-size: 1rem;
//     strong {
//       font-weight: 500;
//       color: #ff4d57;
//     }
//   }
//   ul {
//     position: relative;
//     display: flex;
//     flex-wrap: wrap;
//     padding: 0;
//     margin: 0;
//     gap: 4px;
//     flex-direction: column;
//     align-items: center;
//     width: 80%;
//     li {
//       position: relative;
//       display: block;
//       color: #595959;
//       width: 100%;
//       list-style: none;
//       border-radius: 4px;
//       color: #595959;
//       font-size: 0.9rem;
//       border: 1px solid #f6f6f6;
//       > div {
//         position: relative;
//         height: 44px;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         background-color: #fff;
//       }
//       span {
//         position: relative;
//         width: 44px;
//         height: 44px;
//       }
//       strong {
//         font-weight: normal;
//       }
//       i,
//       em {
//         display: flex;
//         justify-content: center;
//         font-style: normal;
//         width: 50px;
//       }
//       i {
//         color: #ff4d57;
//         font-size: 1rem;
//       }
//       &.rank_1 {
//         border: 1px solid #fff1b4;
//         > div {
//           background-color: #fff1b4;
//         }
//       }
//       &.rank_2 {
//         border: 1px solid #ececec;
//         > div {
//           background-color: #ececec;
//         }
//       }
//       &.rank_3 {
//         border: 1px solid #ffe6d4;
//         > div {
//           background-color: #ffe6d4;
//         }
//       }
//       @keyframes AnimateBG {
//         0% {
//           background-position: 0% 50%;
//         }
//         100% {
//           background-position: -150% 50%;
//         }
//       }
//       &.active {
//         box-shadow: 0px 0px 10px 5px rgba(255, 165, 170, 0.5);
//         background-size: 300% 300%;
//         background-image: linear-gradient(-45deg, #ff4d57 0%, #ff4d57 10%, #fff 20%, #ff4d57 30%, #ff4d57 100%);
//         animation: AnimateBG 2s cubic-bezier(1, 0, 0.2, 0.2) infinite;
//         border: none;
//         > div {
//           margin: 3px;
//         }
//         strong {
//           font-weight: 500;
//         }
//       }
//     }
//   }
// `;

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
