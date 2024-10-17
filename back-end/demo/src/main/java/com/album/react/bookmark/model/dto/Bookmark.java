package com.album.react.bookmark.model.dto;

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
public class Bookmark {
	
	private int bookmarkNo; 
	private String savedDate; 
	private int userNo; 
	private String imageId; 
	private String imageUrl; 
	private String authorName; 
	private int width;
	private int height;
	private String createdAt; 
	private String updatedAt; 
	private int likes; 

}
