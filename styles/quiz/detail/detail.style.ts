import styled, { keyframes } from 'styled-components';


export const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
  padding-bottom: 8rem;
`;

export const SectionBlock = styled.div`
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
  #section-title {
    color: #ff264d;
    margin-bottom: 0.5rem;
    font-size: 18px;
    display:flex;
    justify-content:space-between;
    #more{
      display:flex;
      align-items:center;
      font-size:14px;
      color:#888;
    }
  }
  #section-description{
    color:#595959;
    font-size:0.9rem;
  }
  #section-contents {
    margin-top: 2rem;
    #quiz-share-contents {
      width: 80%;
      margin: 0 auto;
    }
  }
`;

export const StatusContainer = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
  height: 70px;
  margin-top: 10px;
  #status {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff6f7;
    border-radius: 12px;
    #count {
      font-size: 1.2rem;
      font-weight: bold;
      color: #ff264d;
    }
  }
`;
export const DateInfoWrapper = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #bcbcbc;
  div{
    margin-bottom:4px;
  }
`;

export const DeleteButton = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: #ff4d57;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  right: calc(50% - 32.5px - 190px);
  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
  }
  z-index: 5;
  &:hover {
    cursor: pointer;
  }
`;

// skeleton
export const gradient = keyframes` 
  0% {background-color: rgba(165, 165, 165, 0.1);}
  50% {background-color: rgba(165, 165, 165, 0.3);}
  100% {background-color: rgba(165, 165, 165, 0.1);}
`;

export const Skeleton = styled.div`
  background-color: #eee;
  border-radius: 1rem;
`;
export const SkeletonThunmbnailChange = styled(Skeleton)`
  width: 100%;
  height: 200px;
  animation: ${gradient} 1.5s linear infinite alternate;
`;
export const SkeletonStatusContainer = styled(StatusContainer)`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
  height: 70px;
  margin-top: 10px;
  div {
    background-color: #eee;
    border-radius: 12px;
    animation: ${gradient} 1.5s linear infinite alternate;
  }
`;
export const SkeletonTitle = styled(Skeleton)`
  width: 250px;
  height: 24px;
  animation: ${gradient} 1.5s linear infinite alternate;
`;
export const SkeletonRanking = styled.div`
  background-color: #eee;
  border-radius: 4px;
  animation: ${gradient} 1.5s linear infinite alternate;
  width: 100%;
  height: 50px;
  margin: 3px;
  margin-bottom: 7px;
`;