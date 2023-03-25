import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// user스토어의 초기값을 설정
const initialState: SolveQuizSetType = {
  quizSetId: '',
  setTitle: '',
  quizList: [],
  quizMaker: { nickname: '', profileImg: '' },
  quizSetThumbnail: '',
  answerList: [],
  description:'',
};

// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const solveSlice = createSlice({
  name: 'solve', // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    saveSolveProblemSetAction: (
      state: SolveQuizSetType,
      action: PayloadAction<{
        quizSetId: string;
        setTitle: string;
        quizList: SolveQuizType[];
        quizMaker: UserType;
        quizSetThumbnail: string;
        description: string;
      }>,
    ) => {
      const { quizSetId, setTitle, quizList, quizMaker, quizSetThumbnail, description } = action.payload;
      state.setTitle = setTitle;
      state.quizSetId = quizSetId;
      state.quizList = quizList;
      state.quizMaker = quizMaker;
      state.quizSetThumbnail = quizSetThumbnail;
      state.description = description;
    },
    resetSolve: (state: SolveQuizSetType) => {
      Object.assign(state, initialState);
    },
    saveSolveAnswersAction: (state: SolveQuizSetType, action: PayloadAction<{ answerList: number[] }>) => {
      const { answerList } = action.payload;
      state.answerList = answerList;
    },
  },
});

export const { saveSolveProblemSetAction, saveSolveAnswersAction, resetSolve } = solveSlice.actions;

export default solveSlice.reducer;
