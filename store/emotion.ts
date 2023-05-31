import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: QuizSetEmotionType = {
  FUNNY: 0,
  EASY: 0,
  HARD: 0,
  ANGRY: 0,
};
const emotionSlice = createSlice({
  name: 'emotion',
  initialState,
  reducers: {
    saveEmotionCount: (
      state: QuizSetEmotionType,
      action: PayloadAction<{
        quizSetEmotion: QuizSetEmotionType;
      }>,
    ) => {
      const { quizSetEmotion } = action.payload;
      state.FUNNY = quizSetEmotion.FUNNY;
      state.ANGRY = quizSetEmotion.ANGRY;
      state.EASY = quizSetEmotion.EASY;
      state.HARD = quizSetEmotion.HARD;
    },

  },
});

export const { saveEmotionCount } = emotionSlice.actions;

export default emotionSlice.reducer;
