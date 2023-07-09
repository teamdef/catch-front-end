// 댓글
export interface CommentType {
  nickname: string;
  content: string;
  created_at: string;
  user?: UserType;
}
