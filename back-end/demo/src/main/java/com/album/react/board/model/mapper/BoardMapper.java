package com.album.react.board.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.album.react.board.model.dto.Board;

@Mapper
public interface BoardMapper {

	/** 포스트 업로드 
	 * @param board
	 * @return
	 */
	Board uploadPost(Board board);

}
