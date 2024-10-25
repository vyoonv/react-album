package com.album.react.board.model.dto;

import com.album.react.user.model.dto.User;

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
public class Board {
	
	private int boardNo;
	private String boardTitle;
	private String boardContent; 
	private String writeDate; 
	private int likeCount; 
	private int viewCount; 
	private int commentCount;
	
	private int userNo; 
	private String writerName; 
	private String writerProfileImg; 
	private String userEmail; 

}
