import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// user스토어의 초기값을 설정
const initialState: SolveProblemSetTypes = {
  solveUserId: '',
  quizId: '',
  solveUserName: '',
  solveUserScore: 0,
  solveProblemSetTitle: '',
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
      action: PayloadAction<{ solveProblemSetTitle: string; quizId: string; solveProblems: SolveProblemTypes[] }>,
    ) => {
      const { solveProblemSetTitle, quizId, solveProblems } = action.payload;
      state.solveProblemSetTitle = solveProblemSetTitle;
      state.quizId = quizId;
      state.solveProblems = solveProblems;
    },
    saveSolveUserNameAction: (state: SolveProblemSetTypes, action: PayloadAction<{ solveUserName: string }>) => {
      const { solveUserName } = action.payload;
      state.solveUserName = solveUserName;
    },
    saveSolveUserIdAction: (state: SolveProblemSetTypes, action: PayloadAction<{ solveUserId: string }>) => {
      const { solveUserId } = action.payload;
      state.solveUserId = solveUserId;
    },
    saveSolveUserScoreAction: (state: SolveProblemSetTypes, action: PayloadAction<{ solveUserScore: number }>) => {
      const { solveUserScore } = action.payload;
      state.solveUserScore = solveUserScore;
    },
    saveSolveAnswersAction: (state: SolveProblemSetTypes, action: PayloadAction<{ solveAnswers: SolveAnswerTypes[] }>) => {
      const { solveAnswers } = action.payload;
      state.solveAnswers = solveAnswers;
    },
  },
});

export const {
  saveSolveProblemSetAction,
  saveSolveAnswersAction,
  saveSolveUserNameAction,
  saveSolveUserIdAction,
  saveSolveUserScoreAction,
} = solveSlice.actions;

export default solveSlice.reducer;
