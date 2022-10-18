// ChoiceImageTypes - 이미지 타입 객관식 답안
interface ChoiceImageTypes {
  imgURL: string; //  최적화 시킨 이미지 파일 url
  imgName: string; // 최적화 시킨 이미지 파일 이름.
  // 위 두 정보를 합쳐서 객체로 변환해야 함.
}
// ChoiceTextType - 텍스트 타입 객관식 답안
interface ChoiceTextTypes {
  choiceText: string; // 답안
}
// ProblemType - 문제 정보
interface ProblemTypes {
  problemTitle: string; // 문제 제목
  correctIndex: number; // 정답 번호
  choiceType: 'img' | 'text'; // 이미지형 문제 , 텍스트형 문제
  choices: (ChoiceTextTypes | ChoiceImageTypes)[]; // 객관식 답안 배열
}
// ProblemSetType - 문제집 정보
interface ProblemSetTypes {
  setTitle: string; // 문제집 제목
  problems: ProblemTypes[]; // 문제 배열
}


//----------------------풀이------------------------
// SolveProblemTypes - 문제(풀이용) 정보
interface SolveProblemTypes {
  solveProblemTitle: string; // 문제 제목
  solveChoices: string[]; // 객관식 항목 배열
}
interface SolveAnswerTypes {
  solveAnswer: string; // 정답 이름
  solveAnswerId: string; // 정답 id 값
}
// SolveProblemSetTypes - 문제집(풀이용) 정보
interface SolveProblemSetTypes {
  solveUserName: string; // 유저 닉네임
  solveUserScore: Number; // 유저 스코어
  solveSetTitle: string; // 문제집 제목
  solveProblems: SolveProblemTypes[]; // 문제 배열
  solveAnswers: SolveAnswerTypes[];
}
interface SolveUserInfoTypes {
  
}
// /------------------------------------------------
