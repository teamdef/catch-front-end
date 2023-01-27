import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  padding-top: 40px;
  padding-bottom: 80px;
`;

export const ScoreCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 6%;
  width: 100%;
  height: 200px;
  /* background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"); */
  border: 3px dashed #d6d6d6;
  border-radius: 30px;
  color: #888;
  > div {
    flex-grow: 1;
    p {
      word-break: keep-all;
      font-size: 1.8rem;
      font-family: 'RixInooAriDuriR';
      .nickname {
        color: #595959;
        padding: 5px 15px;
        background-color: #d9d9d9;
        border-radius: 15px;
      }
      b {
        color: #ff4d57;
      }
      & + p {
        margin-top: 10px;
      }
    }
  }
  img {
    position: absolute;
    right: 0%;
    bottom: -20%;
    width: 75%;
  }
`;
export const ButtonArea = styled.div`
  position: relative;
  margin-top: 60px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 45%);
  justify-content: space-around;
  align-items: center;
  button {
    font-size: 1rem;
    font-family: 'RixInooAriDuriR';
    width: 100%;
    border: 2px solid transparent;
    span {
      margin: 0 10px;
    }
  }
  #like {
    box-shadow: 0 4px #888;
    background-color: #aaa;
    color: #fff;
    &.on {
      background-color: #ff4d57;
      color: #fff;
      border: 2px solid #ff4d57;
      box-shadow: 0 4px #DA3942;
    }
  }
  #replay {
    background-color: rgba(255, 179, 89, 1);
    box-shadow: 0 4px #dd911e;
  }
  #note {
    background-color: #91ce61;
    box-shadow: 0 4px #8ba554;
  }
`;

export const SNSShareContainer = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  #explain {
    color: #888;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    svg {
      margin-right: 4px;
    }
  }
`;
