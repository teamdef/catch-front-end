import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// user스토어의 초기값을 설정
const initialState: SolveUserType = {
  solveUserId: '',
  solveUserName: '',
  solveUserScore: undefined,
};
// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const solveUserSlice = createSlice({
  name: 'user_solve',
  initialState,
  reducers: {
    saveSolveUserNameAction: (state: SolveUserType, action: PayloadAction<{ solveUserName: string }>) => {
      const { solveUserName } = action.payload;
      state.solveUserName = solveUserName;
    },
    saveSolveUserIdAction: (state: SolveUserType, action: PayloadAction<{ solveUserId: string }>) => {
      const { solveUserId } = action.payload;
      state.solveUserId = solveUserId;
    },
    saveSolveUserScoreAction: (state: SolveUserType, action: PayloadAction<{ solveUserScore: number }>) => {
      const { solveUserScore } = action.payload;
      state.solveUserScore = solveUserScore;
    },
    resetUserDataAction: (state: SolveUserType) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  saveSolveUserNameAction,
  saveSolveUserIdAction,
  saveSolveUserScoreAction,
  resetUserDataAction,
} = solveUserSlice.actions;

export default solveUserSlice.reducer;
