package com.album.react.board.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
		response.setLikeCount(board.getLikeCount());
		
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
			
	/** 좋아요 업데이트 
	 * @param boardNo
	 * @param likeRequest
	 * @return
	 */
	@PostMapping(value = "/{id}/like", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Integer> updateLikeCount(@PathVariable("id") int boardNo, 
												   @RequestBody Map<String, Object> likeRequest) {
		 log.info("Received LikeRequest: {}", likeRequest); 
		 boolean isLiked = (Boolean) likeRequest.get("isLiked");
	     String userEmail = (String) likeRequest.get("userEmail"); 
		 log.info("사용자 이메일: {}", userEmail); 
		 log.info("공감 눌린상태?? : {}", isLiked);
		
		try {
			int isUpdated; 
			
			if(isLiked) {
				isUpdated = service.incrementLikeCount(boardNo, userEmail); 
			} else {
				isUpdated = service.decrementLikeCount(boardNo, userEmail); 
			}
				return ResponseEntity.ok(isUpdated);
				
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); 
		}
	}
	

}
