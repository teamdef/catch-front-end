import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// user스토어의 초기값을 설정
const initialState: ProblemSetTypes = {
  setTitle: '',
  problems: [],
};

// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const quizSlice = createSlice({
  name: 'quiz', // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    saveProblemSetTitleAction: (
      state: ProblemSetTypes,
      action: PayloadAction<{ setTitle: string }>,
    ) => {
      const { setTitle } = action.payload;
      state.setTitle = setTitle;
    },
    saveProblemsAction: (state: ProblemSetTypes, action: PayloadAction<{ problems: ProblemTypes[] }>) => {
      const { problems } = action.payload;
      state.problems = problems;
    },
  },
});

export const { saveProblemSetTitleAction, saveProblemsAction } = quizSlice.actions;

export default quizSlice.reducer;
