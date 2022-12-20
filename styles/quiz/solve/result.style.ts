import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 5%;
  min-height: 100vh;
  background-color: #fff;
  a {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    padding: 5%;
  }
`;
export const ButtonArea = styled.div`
  position: relative;
  display: flex;
  width: 70%;
  justify-content: space-evenly;
  align-items: center;
`;
export const ScoreArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  color: #595959;
  margin-top: 4rem;
  > h1 {
    font-size: 1rem;
    font-weight: normal;
    margin: 0 0 5%;
    strong {
      font-weight: bold;
      font-size: 2rem;
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
export const ProgressArea = styled.div`
  position: relative;
  display: block;
  width: 80%;
  span {
    padding: 0 15px !important;
    display: none !important;
  }
`;
export const RankingArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  > h2 {
    margin-top: 0;
    font-weight: normal;
    color: #888;
    font-size: 1rem;
    strong {
      font-weight: 500;
      color: #ff4d57;
    }
  }
  ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    gap: 4px;
    flex-direction: column;
    align-items: center;
    width: 80%;
    li {
      position: relative;
      display: block;
      color: #595959;
      width: 100%;
      list-style: none;
      border-radius: 4px;
      color: #595959;
      font-size: 0.9rem;
      border: 1px solid #f6f6f6;
      > div {
        position: relative;
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
      }
      span {
        position: relative;
        width: 44px;
        height: 44px;
      }
      strong {
        font-weight: normal;
      }
      i,
      em {
        display: flex;
        justify-content: center;
        font-style: normal;
        width: 50px;
      }
      i {
        color: #ff4d57;
        font-size: 1rem;
      }
      &.rank_1 {
        border: 1px solid #fff1b4;
        > div {
          background-color: #fff1b4;
        }
      }
      &.rank_2 {
        border: 1px solid #ececec;
        > div {
          background-color: #ececec;
        }
      }
      &.rank_3 {
        border: 1px solid #ffe6d4;
        > div {
          background-color: #ffe6d4;
        }
      }
      @keyframes AnimateBG {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: -150% 50%;
        }
      }
      &.active {
        box-shadow: 0px 0px 10px 5px rgba(255, 165, 170, 0.5);
        background-size: 300% 300%;
        background-image: linear-gradient(-45deg, #ff4d57 0%, #ff4d57 10%, #fff 20%, #ff4d57 30%, #ff4d57 100%);
        animation: AnimateBG 2s cubic-bezier(1, 0, 0.2, 0.2) infinite;
        border: none;
        > div {
          margin: 3px;
        }
        strong {
          font-weight: 500;
        }
      }
    }
  }
`;

export const ScorePostIt = styled.div`
  background-color: #ffe896;
  width: 200px;
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:1rem;

  #score {
    font-family: BMEuljiro10yearslater;
    color: #ff4d57;
    font-size:70px;
    padding-bottom:0.5rem;
  }
  #tack-img {
    width: 50px;
    position: absolute;
    top: -25px;
    left: 70px;
  }
  #red-pencil-img {
    display: flex;
    justify-content: center;
    width: 150px;
  }
`;



