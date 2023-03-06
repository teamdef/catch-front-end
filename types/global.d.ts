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
// ProblemType - 퀴즈 정보
interface ProblemTypes {
  problemTitle: string; // 퀴즈 제목
  correctIndex: number; // 정답 번호
  choiceType: 'img' | 'text'; // 이미지형 퀴즈 , 텍스트형 퀴즈
  choices: (ChoiceTextTypes | ChoiceImageTypes)[]; // 객관식 답안 배열
}
// ProblemSetType - 퀴즈세트 정보
interface ProblemSetTypes {
  setTitle: string; // 퀴즈세트 제목
  description?:string // 퀴즈 세트 설명 
  problems: ProblemTypes[]; // 퀴즈 배열
}

// 풀이
// SolveChoicesTypes - 퀴즈 항목 타입
interface SolveChoicesTypes {
  cho_img: string|undefined // 이미지 항목
  cho_txt: string|undefined // 텍스트 항목
  id: string // 항목 아이디
}
// SolveProblemTypes - 퀴즈(풀이용) 정보
interface SolveProblemTypes {
  choices: SolveChoicesTypes[]; // 객관식 항목 배열
  correct_choice: string; // 정답 아이디
  id:string; // 퀴즈별 아이디
  is_img:boolean; // 이미지형 텍스트형 구분
  prob_title: string; // 퀴즈 제목
}

// SolveProblemSetTypes - 퀴즈세트(풀이용) 정보
interface SolveProblemSetTypes {
  problemSetId: string; // 퀴즈 아이디
  solveProblemSetTitle: string; // 퀴즈세트 제목
  solveProblems: SolveProblemTypes[]; // 퀴즈 배열
  solveAnswers: string[]; // 유저가 고른 항목(답안지) 배열
  maker:makerTypes[];
  thumbnail:string;
}
interface makerTypes {
  nickname: string;
  profile_img: string;
}
// 풀이자 정보
interface SolveUserTypes {
  solveUserName: string; // 유저 닉네임
  solveUserScore: number; // 유저 스코어
  solveUserId: string; // 유저 아이디
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
