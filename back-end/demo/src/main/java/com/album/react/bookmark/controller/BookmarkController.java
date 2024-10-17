package com.album.react.bookmark.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.album.react.bookmark.model.dto.Bookmark;
import com.album.react.bookmark.model.dto.BookmarkRequest;
import com.album.react.bookmark.model.service.BookmarkService;
import com.album.react.user.model.dto.User;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BookmarkController {
	
	private final BookmarkService service; 
	
	@PostMapping("/bookmark")
	public ResponseEntity<String> addBookmark( @RequestBody BookmarkRequest bookmarkRequest,
												HttpServletRequest request) {
		
		String userEmail = bookmarkRequest.getUserEmail();
		int userNo = service.getUserNoByEmail(userEmail); // 사용자 메일 받아온 거 userNo로 넘기기 
		
		Bookmark bookmark = Bookmark.builder()
							.imageId(bookmarkRequest.getImageId())
							.imageUrl(bookmarkRequest.getImageUrl())
							.authorName(bookmarkRequest.getAuthorName())
							.width(bookmarkRequest.getWidth())
							.height(bookmarkRequest.getHeight())
							.userNo(userNo)
							.build(); 
		
		service.addBookmark(bookmark); 
		
		return ResponseEntity.ok("북마크가 추가되었습니다."); 
		
//		
//		int photoNo = bookmarkRequest.getPhotoNo(); // 사용자 업로드 이미지인 경우 photoNo 가져오기 
//		String imageUrl = bookmarkRequest.getImageUrl();  // api 이미지인 경우 imageUrl 가져오기 
//		
//		Bookmark bookmark = new Bookmark(); 
//		bookmark.setPhotoNo(photoNo); 
//		bookmark.setUserNo(userNo); 
//		
//		service.addBookmark(bookmark); 
		
	}

}
