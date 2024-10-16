package com.album.react.bookmark.model.dto;

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
public class ImageDetails {
	
	private String id; 
	private String urls; 
	private String user;
	private String width; 
	private String height;
	private String createdAt; 
	

}
