package com.album.react.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.album.react.board.model.dto.Board;

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

}
