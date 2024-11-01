package com.album.react.comment.model.dto;

import com.album.react.board.model.dto.Board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
	
	private int commentNo; 
	private String commentContent; 
	private String writeDate; 

	private int boardNo; 
	private int userNo; 
	private String profileImg; 
	
	private int parentCommentNo; // 부모 댓글 번호 
	private int depth; // 0은 기본 1은 대댓글 
	

}
