package com.album.react.board.model.service;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.album.react.board.model.dto.Board;
import com.album.react.board.model.mapper.BoardMapper;
import com.album.react.comment.model.dto.Comment;

import lombok.RequiredArgsConstructor;

@Transactional
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

	/**
	 * 댓글 등록 
	 */
	@Override
	public Comment saveComment(Comment comment) {
		
		int result = mapper.saveComment(comment);
		
		if(result > 0) {
			return comment; 
		} else {
			throw new RuntimeException("댓글 등록 실패했습니다."); 
		}

	}

	/**
	  댓글 조회 
	 */
	@Override
	public List<Comment> getCommentsByBoardId(int boardNo) {
		
		return mapper.getCommentsByBoardId(boardNo);
	}

	/**
	 * 좋아요 증가 
	 */
	@Override
	public int incrementLikeCount(int boardNo, String userEmail) {
		
		Map<String, Object> params = new HashMap<>(); 
		params.put("boardNo", boardNo); 
		params.put("userEmail", userEmail); 
		
		int ifLikedBefore = mapper.checkIfLiked(params); 
		
		if(ifLikedBefore == 0) {
			mapper.insertLike(params); 
			return mapper.incrementLikeCount(boardNo); 
			
		} else {
			return 0; 
		}
		
	}

	/**
	 * 좋아요 감소 
	 */
	@Override
	public int decrementLikeCount(int boardNo, String userEmail) {
		
		Map<String, Object> params = new HashMap<>(); 
		params.put("boardNo", boardNo); 
		params.put("userEmail", userEmail); 
		
		int ifLikedBefore = mapper.checkIfLiked(params); 
		
		if(ifLikedBefore > 0) {
			mapper.deleteLike(params); 
			return	mapper.decrementLikeCount(boardNo);
			
		} else {
			return 0; 
		}
		
	}



}
