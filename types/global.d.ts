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

// 풀이

// SolveProblemTypes - 문제(풀이용) 정보
interface SolveProblemTypes {
  solveProblemTitle: string; // 문제 제목
  solveChoices: string[]; // 객관식 항목 배열
}
// 풀이자 오답 노트
interface SolveAnswerTypes {
  solveCorrectAnswer: string; // 정답
  solveProbleTitle: string; // 문제 제목
  solveUserAnswer: string; // 풀이자 답
}

// 풀이자 정보
interface SolveUserTypes {
  solveUserName: string; // 유저 닉네임
  solveUserScore: Number; // 유저 스코어
  solveUserId: string; // 유저 아이디
}
// SolveProblemSetTypes - 문제집(풀이용) 정보
interface SolveProblemSetTypes {
  problemSetId: string; // 퀴즈 아이디
  solveProblemSetTitle: string; // 문제집 제목
  solveProblems: SolveProblemTypes[]; // 문제 배열
  solveAnswers: SolveAnswerTypes[];
}

// 한줄평
interface CommentSetTypes {
  comments: CommentTypes[];
}
interface CommentTypes {
  nickname: string;
  content: string;
  created_at: string;
  user: string;
}

// 공지사항 타입
interface NoticeTypes {
  title: string;
  content: string;
  uploadDate: string;
}
// 전역 window 객체에 KaKao 라는 객체가 있음을 알린다.

interface Window {
  Kakao: any; // 카카오
  adsbygoogle: any; // 구글 애드센스
}
