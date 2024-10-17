package com.album.react.bookmark.model.service;

import com.album.react.bookmark.model.dto.Bookmark;

public interface BookmarkService {

	/** 북마크 추가하기 
	 * @param bookmark
	 */
	void addBookmark(Bookmark bookmark);

	/** 넘겨받은 이메일로 userNo 넘기
	 * @param userEmail
	 * @return
	 */
	int getUserNoByEmail(String userEmail);

}
