import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteToken } from 'utils/token';
import Router from 'next/router';
// user 스토어 타입 정의
interface UserTypes {
  isLoggedin: boolean;
  userId: string;
  userProfileImage: string;
  userNickname: string;
}

// user스토어의 초기값을 설정
const initialState: UserTypes = {
  isLoggedin: false,
  userId: '',
  userProfileImage: '',
  userNickname: '',
};

// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const userSlice = createSlice({
  name: 'user', // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    loginAction: (
      state: UserTypes,
      action: PayloadAction<{ userId: string; userProfileImage: string; userNickname: string }>,
    ) => {
      const { userId, userProfileImage, userNickname } = action.payload;
      state.isLoggedin = true;
      state.userId = userId;
      state.userProfileImage = userProfileImage;
      state.userNickname = userNickname;
    },
    logoutAction: (state: UserTypes) => {
      state.isLoggedin = false;
      state.userId = '';
      state.userProfileImage = '';
      state.userNickname = '';
      deleteToken(); // 헤더와 쿠키에서 토큰 제거
      Router.push('/'); // 로그인 화면으로 이동

    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
