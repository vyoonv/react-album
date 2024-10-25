package com.album.react.board.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.album.react.board.model.dto.Board;
import com.album.react.board.model.service.BoardService;
import com.album.react.user.model.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService service; 
	private final UserService userService; 
	
	@GetMapping("/boardList")
	public ResponseEntity<List<Board>> getBoardList() {
		List<Board> boards = service.getBoardList(); 
		return ResponseEntity.ok(boards); 
	}
	
	/** 포스트 업로드하기 
	 * @param board
	 * @return
	 */
	@PostMapping
	public ResponseEntity<Board> uploadPost(@RequestBody Board board) {
		
		Integer userNo = userService.getUserNo(board.getUserEmail()); 
		if(userNo == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST); 
		}
		
		board.setUserNo(userNo);
		
		service.uploadPost(board);
		
		// 게시물 조회 시 userEmail, writerName, writerProfileImg
		Board saveBoard = new Board(); 
		saveBoard.setBoardTitle(board.getBoardTitle());
		saveBoard.setBoardContent(board.getBoardContent());
		saveBoard.setUserNo(userNo);
		saveBoard.setWriterName(userService.getUserName(userNo));
		saveBoard.setWriterProfileImg(userService.getUserProfileImg(userNo));
		saveBoard.setUserEmail(board.getUserEmail());
		
		return new ResponseEntity<>(saveBoard, HttpStatus.CREATED); 
		
		
	}
	
	
	

}
