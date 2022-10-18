import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteToken } from 'utils/token';
import Router from 'next/router';
// user 스토어 타입 정의

interface UserTypes {
  isLoggedin: boolean;
  id: string;
  profileImg: string;
  nickName: string;
  kakaoUid: number;
}

// user스토어의 초기값을 설정
const initialState: UserTypes = {
  isLoggedin: false,
  id: '',
  profileImg: '/assets/img/user_default.png', // 디폴트 이미지
  nickName: '',
  kakaoUid: -1,
};

// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const userSlice = createSlice({
  name: 'user', // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    loginAction: (
      state: UserTypes,
      action: PayloadAction<{ id: string; profileImg: string; nickName: string; kakaoUid: number }>,
    ) => {
      const { id, profileImg, nickName, kakaoUid } = action.payload;
      state.isLoggedin = true;
      state.id = id;
      state.profileImg = profileImg;
      state.nickName = nickName;
      state.kakaoUid = kakaoUid;
    },
    logoutAction: (state: UserTypes) => {
      Router.push('/home'); // 메인화면으로 이동
      deleteToken(); // 헤더와 쿠키에서 토큰 제거
      state.isLoggedin = false;
      state.id = '';
      state.profileImg = '/assets/img/user_default.png'; // 디폴트 이미지
      state.nickName = '';
      state.kakaoUid = -1;
    },
    profileUploadAction: (
      state: UserTypes,
      action: PayloadAction<{ profileImg: string; }>,
    ) => { 
      state.profileImg = action.payload.profileImg;
    }
  },
});

export const { loginAction, logoutAction, profileUploadAction } = userSlice.actions;
export default userSlice.reducer;
