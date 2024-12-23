export default interface Comment {
  userName: string;
  userProfileImg: string;
  commentContent: string;
  commentNo: number;
  boardNo: number;
  parentCommentNo?: number | null;
}
