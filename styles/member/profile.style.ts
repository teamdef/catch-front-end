import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top:40px;
`;
export const MarginDiv = styled.div`
  height: 62px;
`;
export const ProfileImgInputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
export const ProfileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ProfileNicknameInput = styled.input`
  height: 50px;
  width: 80%;
  border-radius: 25px;
  border: solid 1px #d6d6d6;
  outline: none;
  padding-left: 2rem;
  padding-right: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  &::placeholder {
    color: #d6d6d6;
  }
`;
export const SaveButton = styled.button`
  bottom: 0;
  font-size: 14px;
  border-radius: 30px;
  border: none;
  height: 50px;
  font-weight: 500;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  background-color: #ff4d57;
  color: #fff;
  width: 50%;
  margin-top: 3rem;
  &:disabled {
    color: #7c7c7c;
    background-color: #ececec;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const ProfileThumbnail = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const ProfileSetting = styled.div`
  display: flex;
  align-items: center;
  input {
    display: none;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    position: absolute;
    top: 5px;
    right: 0px;
    border: solid 1px #d6d6d6;
    background-color: white;
    padding: 0.5rem;
    border-radius: 50%;
    color: rgb(59, 59, 59);
    &:hover {
      background-color: lightgrey;
      cursor: pointer;
    }
  }
`;
export const Error = styled.div`
  color: #ff4d57;
  font-size: 14px;
  text-align: center;
`;
export const Info = styled.div`
  color: #888;
  font-size: 0.9rem;
  line-height:1.2rem;
  text-align: center;
`;
