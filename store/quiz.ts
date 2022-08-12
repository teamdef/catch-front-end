import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ChoiceImageTypes - 이미지 타입 객관식 답안
interface ChoiceImageTypes {
  choiceImageFileUrl: string; //  최적화 시킨 이미지 파일 url 
  choiceImageFilename: string; // 최적화 시킨 이미지 파일 이름.
  // 위 두 정보를 합쳐서 객체로 변환해야 함. 
}
// ChoiceTextType - 텍스트 타입 객관식 답안
interface ChoiceTextTypes {
  choiceText: string; // 답안
}
// ProblemType - 문제 정보
interface ProblemTypes {
  problemTitle: string; // 문제 제목
  correctIndex: string; // 정답 번호
  choiceType: 'img' | 'text'; // 이미지형 문제 , 텍스트형 문제
  choices: (ChoiceTextTypes | ChoiceImageTypes)[]; // 객관식 답안 배열
}
// ProblemSetType - 문제집 정보
interface ProblemSetTypes {
  setTitle: string; // 문제집 제목
  userId: string; // 문제 출제자 id
  problems: ProblemTypes[]; // 문제 배열
}

// user스토어의 초기값을 설정
const initialState: ProblemSetTypes = {
  setTitle: '',
  userId: '',
  problems: [],
};

// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const quizSlice = createSlice({
  name: 'quiz', // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    saveProblemSetTitleAction: (
      state: ProblemSetTypes,
      action: PayloadAction<{ userId: string; setTitle: string }>,
    ) => {
      const { userId, setTitle } = action.payload;
      state.userId = userId;
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
