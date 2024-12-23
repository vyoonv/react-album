package com.album.react.board.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.album.react.board.model.dto.Board;
import com.album.react.comment.model.dto.Comment;

@Mapper
public interface BoardMapper {

	/** 포스트 업로드 
	 * @param board
	 * @return
	 */
	void uploadPost(Board board);

	/**
	 *  게시판 리스트 가져오기 
	 */
	List<Board> getBoardList();

	/** 게시물 상세 
	 * @param boardNo
	 * @return
	 */
	Board boardDetail(int boardNo);

	/** 댓글 등록 
	 * @param comment
	 * @return
	 */
	int saveComment(Comment comment);

	/** 댓글 조회 
	 * @param boardNo
	 * @return
	 */
	List<Comment> getCommentsByBoardId(int boardNo);

	/** 좋아요 증가 
	 * @param boardNo
	 * @return
	 */
	int incrementLikeCount(int boardNo);

	/** 좋아요 감소 
	 * @param boardNo
	 * @return
	 */
	int decrementLikeCount(int boardNo);

	/** 좋아요 여부 확인 
	 * @param params
	 * @return
	 */
	int checkIfLiked(Map<String, Object> params);

	/** 좋아요 추가 (user에게) 
	 * @param params
	 */
	void insertLike(Map<String, Object> params);

	/** 좋아요 삭제(user에게) 
	 * @param params
	 */
	void deleteLike(Map<String, Object> params);

	/** 조회수 증가 
	 * @param boardNo
	 * @return
	 */
	void incrementViewCount(int boardNo);

}
