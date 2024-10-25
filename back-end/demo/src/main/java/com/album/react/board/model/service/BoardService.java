package com.album.react.board.model.service;

import java.util.List;

import com.album.react.board.model.dto.Board;

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


}
