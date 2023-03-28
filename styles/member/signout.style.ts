import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 40px;
  min-height: 100vh;
  h3 {
    color: #ff4d57;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
  p {
    margin-top: 40px;
  }
  #warning {
    font-weight: bold;
    color: #ff4d57;
    font-size: 1.1rem;
  }
  ul {
    margin-top: 20px;
    li {
      margin-bottom: 16px;
    }
  }
  hr {
    border: 0;
    border-top: solid 1px #d6d6d6;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  #button-wrapper {
    display: flex;
    @media(max-width:390px){
        flex-direction:column;
    }
    gap: 8px;
    position: fixed;
    width: 100%;
    left: 50%;
    padding: 0 calc(480px * 0.03);
    transform: translateX(-50%);
    max-width:480px;
    bottom:20px;
    button {
      width: 100%;
    }
    button:nth-child(1) {
      background-color: white;
      color: #595959;
      border: solid 1px #d6d6d6;
    }
  }
`;
