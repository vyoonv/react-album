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
public class BookmarkRequest {
	
	private String userEmail; 
	private String imageUrl;
	private int photoNo; 

	private ImageDetails image;
	private Bookmark bookmark; 
}
