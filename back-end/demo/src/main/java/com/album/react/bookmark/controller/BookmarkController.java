package com.album.react.bookmark.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	/** 북마크 저장하기 
	 * @param bookmarkRequest
	 * @param request
	 * @return
	 */
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
							.createdAt(bookmarkRequest.getCreatedAt())
							.updatedAt(bookmarkRequest.getUpdatedAt())
							.likes(bookmarkRequest.getLikes())
							.userNo(userNo)
							.build(); 
		
		service.addBookmark(bookmark); 
		
		return ResponseEntity.ok("북마크가 추가되었습니다."); 
		
	}
	
	/** 북마크 삭제하기 
	 * @param imageId
	 * @return
	 */
	@DeleteMapping("/bookmark/{imageId}")
	public ResponseEntity<String> deleteBookmark (@PathVariable("imageId") String imageId) {
		
			try {
				service.deleteBookmark(imageId); 
				
				return ResponseEntity.ok("북마크가 삭제되었습니다.");
				
			} catch (Exception e) {
				
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("북마크 삭제 중 오류 발생했습니다.");
			}
	}

}
