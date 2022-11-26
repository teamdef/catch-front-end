import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: block;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  color: #000;
  background-color: white;
  #warning {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: red;
  }
  * {
    margin: 0 auto;
  }

  .notice {
    padding: 0 10%;
    margin: 15% 0;
    @media (max-height: 700px) {
      margin: 10% 0;
      li {
        margin-bottom: 5%;
      }
    }
    li {
      position: relative;
      font-size: 0.9rem;
      color: #888;
      list-style: none;
      padding-left: 10%;
      margin-bottom: 10%;
      word-break: keep-all;
      strong {
        color: #ff4d57;
      }
      svg {
        position: absolute;
        left: 0;
      }
    }
  }
`;

export const TitleContainer = styled.div`
  overflow: hidden;
  position: relative;
  display: block;
  width: 100%;
  height: 35%;
  #logo-wrapper {
    padding: 1.5rem;
    text-align: left;
    position: relative;
    background-color: transparent;
    z-index: 2;
  }
  #title-input-wrapper {
    color: #fff;
    span {
      text-align: center;
      position: relative;
      display: block;
      margin-top: 15px;
      margin-bottom: 15px;
      z-index: 2;
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff4d57;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
    display: block;
    width: 600px;
    height: 100%;
    z-index: 1;
  }
`;
export const TitleInput = styled.div`
  z-index: 2;
  display: flex;
  position: relative;
  border-bottom: 2px solid #fff;
  max-width: 70%;
  input {
    height: 50px;
    border: 0;
    width: 85%;
    background-color: transparent;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-size: 20px;
      font-weight: 300;
      opacity: 0.5;
      color: #fff;
    }
  }
  #clear-btn {
    margin: 0;
    height: 50px;
    background-color: transparent;
    border: none;
    color: #fff;
    &:disabled {
      display: none;
    }
    svg {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem 0 1rem;
  background-color: #fff;
  padding: 1rem;
  position: absolute;
  width: 100%;
  bottom: 0;
`;
