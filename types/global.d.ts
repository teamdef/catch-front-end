// ChoiceImageTypes - 이미지 타입
interface ChoiceImageType {
  imgURL: string; //  최적화 시킨 이미지 파일 url
  imgName: string; // 최적화 시킨 이미지 파일 이름.
  // 위 두 정보를 합쳐서 객체로 변환해야 함.
}
// ChoiceTextType - 텍스트 타입 객관식 답안
interface ChoiceTextType {
  choiceText: string; // 답안
}
// QuizType - 퀴즈 정보
interface QuizType {
  quizTitle: string; // 퀴즈 제목
  quizThumbnail?:ChoiceImageType; // 퀴즈 설명 이미지
  correctIndex: number; // 정답 번호
  choiceType: 'img' | 'text'; // 이미지형 퀴즈 , 텍스트형 퀴즈
  choices: (ChoiceTextType | ChoiceImageType)[]; // 객관식 답안 배열
}
// QuizSetType - 퀴즈세트 정보
interface QuizSetType {
  setTitle: string; // 퀴즈세트 제목
  description?: string; // 퀴즈 세트 설명
  quizList: QuizType[]; // 퀴즈 배열
}




// ---------- 퀴즈 풀이 관련 타입 ----------------------- //

// SolveQuizSetType - 풀이용 퀴즈 세트 정보
interface SolveQuizSetType {
  quizSetId: string; // 퀴즈 아이디
  setTitle: string; // 퀴즈세트 제목
  quizMaker: UserType; // 퀴즈 세트 제작자 정보
  quizSetThumbnail: string; // 퀴즈 세트 썸네일
  description: string; // 퀴즈 세트 설명
  quizList: SolveQuizType[]; // 퀴즈 배열
  answerList?: number[]; // 유저가 고른 항목(답안지) 배열
}


// SolveProblemType - 풀이용 퀴즈 문항 정보
interface SolveQuizType {
  quizId: string; // 퀴즈별 아이디
  quizThumbnail: string | null; // 퀴즈 설명 이미지
  quizTitle: string; // 퀴즈 제목
  choiceType: 'img' | 'text'; // 이미지형 퀴즈 , 텍스트형 퀴즈
  choices: string[]; // 객관식 항목 배열
  correctIndex: number; // 정답 아이디
}


// 풀이자 정보
interface SolveUserType {
  solveUserName: string; // 유저 닉네임
  solveUserScore: undefined|number; // 유저 스코어
  solveUserId: string; // 유저 아이디
}

// 한줄평
interface CommentType {
  nickname: string;
  content: string;
  createdAt: string;
  user?: UserType;
}

// 랭킹 보드
interface RankingType {
  nickname: string;
  score: number;
  ranking: number;
  quizCount: number;
}


/* 퀴즈 카드 타입 */
interface RecentQuizType {
  id: string;
  createdAt: string;
  setTitle: string;
  solverCnt: number;
  thumbnail: string | null;
  user: UserType;
}

interface MyQuizType {
  id: string;
  average: number;
  solver_cnt: number;
  thumbnail: string | null;
  set_title: string;
}
interface DetailQuizType {
  createdAt: string;
  updatedAt: string;
  quizSetId: string;
  setTitle: string;
  solverCnt: number;
  quizSetThumbnail: string | null;
  average: number;
  description: string;
}

/* 사용자 정보 타입 */
interface UserType{
  nickname: string;
  profileImg: string; /* 있을 수 도 있고 없을 수 도 있고 ... */
}

/* 감정표현 타입 */
type EmotionType = 'FUNNY' | 'EASY' | 'HARD' | 'ANGRY';
type QuizSetEmotionType = {
  [x in EmotionValueType]: number;
};

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

