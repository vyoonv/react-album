package com.album.react.board.model.mapper;

import java.util.List;

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

	/** 좋아요 업데이트 
	 * @param boardNo
	 * @param i
	 * @return
	 */
	int updateLikeCount(int boardNo, int increment);

}
