import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// user스토어의 초기값을 설정
const initialState: SolveProblemSetTypes = {
  problemSetId: '',
  solveProblemSetTitle: '',
  solveProblems: [],
  maker: '',
  thumbnail: '',
  solveAnswers: [],
};
// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const solveSlice = createSlice({
  name: 'solve', // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    saveSolveProblemSetAction: (
      state: SolveProblemSetTypes,
      action: PayloadAction<{
        solveProblemSetTitle: string;
        problemSetId: string;
        solveProblems: SolveProblemTypes[];
        maker: string;
        thumbnail: string;
      }>,
    ) => {
      const { solveProblemSetTitle, problemSetId, solveProblems, maker, thumbnail } = action.payload;
      state.solveProblemSetTitle = solveProblemSetTitle;
      state.problemSetId = problemSetId;
      state.solveProblems = solveProblems;
      state.maker = maker;
      state.thumbnail = thumbnail;
    },
    saveSolveAnswersAction: (state: SolveProblemSetTypes, action: PayloadAction<{ solveAnswers: string[] }>) => {
      const { solveAnswers } = action.payload;
      state.solveAnswers = solveAnswers;
    },
  },
});

export const { saveSolveProblemSetAction, saveSolveAnswersAction } = solveSlice.actions;

export default solveSlice.reducer;
