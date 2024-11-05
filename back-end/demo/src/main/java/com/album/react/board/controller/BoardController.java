package com.album.react.board.controller;

import java.util.List;

import javax.swing.border.Border;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.album.react.board.model.dto.Board;
import com.album.react.board.model.dto.BoardResponse;
import com.album.react.board.model.dto.LikeRequest;
import com.album.react.board.model.service.BoardService;
import com.album.react.comment.model.dto.Comment;
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
	
	/** 게시물 상세 
	 * @param id
	 * @return
	 */
	@GetMapping("/{id}")
	public ResponseEntity<BoardResponse> boardDetail(@PathVariable("id") int id) {
		Board board = service.boardDetail(id); 
		if(board == null ) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
		}
		
		List<Comment> comments = service.getCommentsByBoardId(id); 
		
		BoardResponse response = new BoardResponse(); 
		response.setBoardItem(board); 
		response.setComments(comments); 
		
		return ResponseEntity.ok(response); 
	}
	
	/** 댓글 등록 
	 * @param boardNo
	 * @param comment
	 * @return
	 */
	@PostMapping("/{boardNo}/comments")
	public ResponseEntity<Comment> addComment (@PathVariable("boardNo") int boardNo, 
												@RequestBody Comment comment ) {
		 Integer userNo = userService.getUserNo(comment.getUserEmail());

		    if (userNo == null) {
		        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
		                             .body(null); 
		    }

		    comment.setUserNo(userNo);
		    comment.setBoardNo(boardNo);
		    comment.setParentCommentNo(comment.getParentCommentNo() == null ? null : comment.getParentCommentNo());
		    
		    
		    try {
		    	
		        Comment savedComment = service.saveComment(comment);
		        
		        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
		        
		    } catch (Exception e) {
		        // 로그에 에러 메시지 출력
		        e.printStackTrace();
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
		                             .body(null);
		    }
		
	}
			
	@PostMapping("/{id}/like")
	public ResponseEntity<Void> updateLikeCount(@PathVariable("id") int boardNo, 
												@RequestBody LikeRequest likeRequest) {

		boolean isLiked = likeRequest.isLiked(); 
	
		try {
			boolean isUpdated; 
			
			if(isLiked) {
				isUpdated = service.incrementLikeCount(boardNo); 
			} else {
				isUpdated = service.decrementLikeCount(boardNo); 
			}
			
			if(isUpdated) {
				return ResponseEntity.ok().build(); 
				
				} else {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
				}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); 
		}
	}
	

}
