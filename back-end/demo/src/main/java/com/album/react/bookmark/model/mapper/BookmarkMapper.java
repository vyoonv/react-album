package com.album.react.bookmark.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.album.react.bookmark.model.dto.Bookmark;

@Mapper
public interface BookmarkMapper {

	/** 이메일로 userNo 넘겨받기 
	 * @param userEmail
	 */
	public Integer getUserNoByEmail(String userEmail);

	/** 북마크 추가하기 
	 * @param bookmark
	 */
	void addBookmark(Bookmark bookmark);

}
