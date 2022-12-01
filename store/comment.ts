import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CommentSetTypes = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    saveCommentSetAction: (state: CommentSetTypes, action: PayloadAction<{ comments: CommentTypes[] }>) => {
      const { comments } = action.payload;
      state.comments = comments;
    },
  },
});

export const { saveCommentSetAction } = commentSlice.actions;

export default commentSlice.reducer;
