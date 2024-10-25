package com.album.react.board.model.service;

import org.springframework.stereotype.Service;

import com.album.react.board.model.dto.Board;
import com.album.react.board.model.mapper.BoardMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{
	
	private final BoardMapper mapper; 
	

	@Override
	public Board uploadPost(Board board) {
		
		return mapper.uploadPost(board);
	}

}
