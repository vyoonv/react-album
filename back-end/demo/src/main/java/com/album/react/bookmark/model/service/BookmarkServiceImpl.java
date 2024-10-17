package com.album.react.bookmark.model.service;

import org.springframework.stereotype.Service;

import com.album.react.bookmark.model.dto.Bookmark;
import com.album.react.bookmark.model.mapper.BookmarkMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {
	
	private final BookmarkMapper mapper; 

	@Override
	public void addBookmark(Bookmark bookmark) {
		
		mapper.addBookmark(bookmark); 
		
	}

	/**
	 * 이메일로 userNo 넘겨 받기 
	 */
	@Override
	public int getUserNoByEmail(String userEmail) {
		
		int userNo = mapper.getUserNoByEmail(userEmail); 
		
		return userNo;
	}

	@Override
	public void deleteBookmark(String imageId) {
		
		mapper.deleteBookmark(imageId);
		
	}

}
