package com.album.react.board.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.album.react.board.model.dto.Board;
import com.album.react.board.model.mapper.BoardMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{
	
	private final BoardMapper mapper; 
	
	/**
	 * 게시판 리스트 가져오기 
	 */
	@Override
	public List<Board> getBoardList() {
		
		return mapper.getBoardList();
	}

	/**
	 * 포스트 업로드 
	 */
	@Override
	public void uploadPost(Board board) {
		
		mapper.uploadPost(board);
	}

	/**
	 * 게시물 상세 
	 */
	@Override
	public Board boardDetail(int boardNo) {
		
		return mapper.boardDetail(boardNo);
	}



}
