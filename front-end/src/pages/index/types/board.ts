export default interface Board {
  boardNo: number;
  boardTitle: string;
  boardContent: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  writeDate: string;
  writerName: string;
  writerProfileImg: string | null;
  boardImg: string | null;
  userEmail: string;
}

export interface Comment {
  userName: string;
  userProfileImg: string;
  commentContent: string;
  commentNo: number;
  boardNo: number;
  parentCommentNo?: number | null;
}
