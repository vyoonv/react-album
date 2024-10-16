package com.album.react.bookmark.model.service;

import com.album.react.bookmark.model.dto.Bookmark;

public interface BookmarkService {

	void addBookmark(Bookmark bookmark);

	/** 넘겨받은 이메일로 userNo 넘기
	 * @param userEmail
	 * @return
	 */
	int getUserNoByEmail(String userEmail);

}
