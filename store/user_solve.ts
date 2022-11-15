import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// user스토어의 초기값을 설정
const initialState: SolveUserTypes = {
  solveUserId: '',
  solveUserName: '',
  solveUserScore: 0,
};
// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const solveUserSlice = createSlice({
  name: 'solve', // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    saveSolveUserNameAction: (state: SolveUserTypes, action: PayloadAction<{ solveUserName: string }>) => {
      const { solveUserName } = action.payload;
      state.solveUserName = solveUserName;
    },
    saveSolveUserIdAction: (state: SolveUserTypes, action: PayloadAction<{ solveUserId: string }>) => {
      const { solveUserId } = action.payload;
      state.solveUserId = solveUserId;
    },
    saveSolveUserScoreAction: (state: SolveUserTypes, action: PayloadAction<{ solveUserScore: number }>) => {
      const { solveUserScore } = action.payload;
      state.solveUserScore = solveUserScore;
    },
  },
});

export const {
  saveSolveUserNameAction,
  saveSolveUserIdAction,
  saveSolveUserScoreAction,
} = solveUserSlice.actions;

export default solveUserSlice.reducer;
