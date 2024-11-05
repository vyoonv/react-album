package com.album.react.board.model.service;

import java.security.Principal;
import java.util.List;

import com.album.react.board.model.dto.Board;
import com.album.react.comment.model.dto.Comment;

public interface BoardService {

	/** 게시판 리스트 가져오기 
	 * @return
	 */
	List<Board> getBoardList();

	/** 포스트 업로드 
	 * @param board
	 * @return
	 */
	void uploadPost(Board board);

	/** 게시물 상세 
	 * @param id
	 * @return
	 */
	Board boardDetail(int id);

	/** 댓글 등록 
	 * @param comment
	 * @return
	 */
	Comment saveComment(Comment comment);

	/** 댓글 조회 
	 * @param id
	 * @return
	 */
	List<Comment> getCommentsByBoardId(int id);

	/** 좋아요 증가 
	 * @param boardNo
	 * @param userEmail 
	 * @return
	 */
	int incrementLikeCount(int boardNo, String userEmail);

	/** 좋아요 감소 
	 * @param boardNo
	 * @param userEmail 
	 * @return
	 */
	int decrementLikeCount(int boardNo, String userEmail);


}
