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
interface TextQuiz {
  quizTitle: string; // 퀴즈 제목
  quizThumbnail?: ChoiceImageType; // 퀴즈 설명 이미지
  correctIndex: number; // 정답 번호
  choiceType: 'text'; // 이미지형 퀴즈 , 텍스트형 퀴즈
  choices: ChoiceTextType[]; // 객관식 답안 배열
}
interface ImageQuiz {
  quizTitle: string; // 퀴즈 제목
  quizThumbnail?: ChoiceImageType; // 퀴즈 설명 이미지
  correctIndex: number; // 정답 번호
  choiceType: 'img'; // 이미지형 퀴즈 , 텍스트형 퀴즈
  choices: ChoiceImageType[]; // 객관식 답안 배열
}
// QuizSetType - 퀴즈세트 정보
interface QuizSetType {
  setTitle: string; // 퀴즈세트 제목
  description?: string; // 퀴즈 세트 설명
  quizList: (TextQuiz | ImageQuiz)[]; // 퀴즈 배열
}

// ---------- 퀴즈 풀이 관련 타입 ----------------------- //
interface SolveQuizSetType {
  quizSetId: string;
  setTitle: string;
  quizMaker: UserType;
  quizSetThumbnail: string;
  description: string;
  quizList: SolveQuizType[];
  answerList?: number[];
}
interface QuizSetDtoType {
  average: number;
  created_at: string;
  description: string;
  emotion: QuizSetEmotionType;
  id: string;
  is_secret: boolean;
  quiz: SolveQuizType[];
  set_title: string;
  solver_cnt: number;
  sum_scores: number;
  thumbnail: string;
  updated_at: string;
  user: UserType;
}

interface SolveQuizType {
  quiz_thumbnail: string | null;
  quiz_title: string;
  choice_type: 'img' | 'text';
  choices: string[];
  correct_idx: number;
}

// 풀이자 정보
interface SolveUserType {
  solveUserName: string;
  solveUserScore: undefined | number;
  solveUserId: string;
}
interface RankingDtoType {
  created_at: string;
  id: string;
  nickname: string;
  quiz_count: number;
  quizset_id: string;
  ranking: number;
  score: number;
}
interface RankingType {
  id: string;
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
interface UserType {
  nickname?: string;
  profile_img?: string /* 있을 수 도 있고 없을 수 도 있고 ... */;
}

/* 감정표현 타입 */
type EmotionType = 'FUNNY' | 'EASY' | 'HARD' | 'ANGRY' | 'NONE';
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
interface CommentType {
  nickname: string;
  content: string;
  created_at: string;
  user?: UserType;
}
