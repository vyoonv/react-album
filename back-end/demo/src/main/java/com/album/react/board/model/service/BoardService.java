package com.album.react.board.model.service;

import com.album.react.board.model.dto.Board;

public interface BoardService {

	/** 포스트 업로드 
	 * @param board
	 * @return
	 */
	Board uploadPost(Board board);

}
