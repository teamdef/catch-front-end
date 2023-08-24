export interface QuizSetDTO {
  quizSetId: string;
  quizSetTitle: string;
  quizSetThumbnail: string | null;
  description?: string;
  createdAt: string;
  updatedAt: string;
  solverCnt: number;
  average: number;
  emotion: QuizSetEmotionType;
  quizSetMaker: UserType;
}

export type QuizSetType2 = QuizSetDTO; // 임시로 2를 붙임.

export type QuizSetCardType = Pick<
  QuizSetType2,
  'quizSetId' | 'createdAt' | 'quizSetTitle' | 'solverCnt' | 'quizSetMaker' | 'quizSetThumbnail'
>;
export interface ChoiceProps {
  choices: string[];
  quizNum: number;
}
