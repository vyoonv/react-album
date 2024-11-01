package com.album.react.board.model.dto;

import java.util.List;

import com.album.react.comment.model.dto.Comment;

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
public class BoardResponse {
	
	private Board boardItem; 
	private List<Comment> comments; 

}
