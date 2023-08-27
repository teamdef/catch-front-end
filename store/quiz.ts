import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// user스토어의 초기값을 설정
const initialState: QuizSetType = {
  setTitle: '',
  description: '',
  quizList: [],
};

// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const quizSlice = createSlice({
  name: 'quiz', // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState, // 초기값 설정
  reducers: {
    saveProblemSetTitleAction: (state: QuizSetType, action: PayloadAction<{ setTitle: string }>) => {
      const { setTitle } = action.payload;
      state.setTitle = setTitle;
    },
    saveProblemDescriptionAction: (state: QuizSetType, action: PayloadAction<{ description: string }>) => {
      const { description } = action.payload;
      state.description = description;
    },
    saveQuizListAction: (state: QuizSetType, action: PayloadAction<{ quizList: (TextQuiz | ImageQuiz)[] }>) => {
      const { quizList } = action.payload;
      state.quizList = quizList;
    },
  },
});

export const { saveProblemSetTitleAction, saveQuizListAction, saveProblemDescriptionAction } = quizSlice.actions;

export default quizSlice.reducer;
