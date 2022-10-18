import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// user스토어의 초기값을 설정
const initialState: SolveProblemSetTypes = {
  solveUserName: '',
  solveUserScore: 0,
  solveSetTitle: '',
  solveProblems: [],
  solveAnswers: [],
};
// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const solveSlice = createSlice({
  name: 'solve', // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    saveSolveProblemSetAction: (
      state: SolveProblemSetTypes,
      action: PayloadAction<{ solveSetTitle: string }>,
    ) => {
      const { solveSetTitle } = action.payload;
      state.solveSetTitle = solveSetTitle;
    },
    saveSolveUserNameAction: (state: SolveProblemSetTypes, action: PayloadAction<{ solveUserName: string }>) => {
      const { solveUserName } = action.payload;
      state.solveUserName = solveUserName;
    },
    saveSolveUserScoreAction: (state: SolveProblemSetTypes, action: PayloadAction<{ solveUserScore: number }>) => {
      const { solveUserScore } = action.payload;
      state.solveUserScore = solveUserScore;
    },
    saveSolveProblemsAction: (state: SolveProblemSetTypes, action: PayloadAction<{ solveProblems: SolveProblemTypes[] }>) => {
      const { solveProblems } = action.payload;
      state.solveProblems = solveProblems;
    },
    saveSolveAnswersAction: (state: SolveProblemSetTypes, action: PayloadAction<{ solveAnswers: SolveAnswerTypes[] }>) => {
      const { solveAnswers } = action.payload;
      state.solveAnswers = solveAnswers;
    },
  },
});

export const { saveSolveProblemSetAction, saveSolveProblemsAction, saveSolveAnswersAction, saveSolveUserNameAction,saveSolveUserScoreAction } = solveSlice.actions;

export default solveSlice.reducer;
