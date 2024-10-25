package com.album.react.user.model.service;

import com.album.react.user.model.dto.User;

public interface UserService {

	/** 회원 정보 저장 
	 * @param user
	 * @return
	 */
	User saveUser(User user);

	/** 존재하는 회원인지 여부 확인 
	 * @param userEmail
	 * @return
	 */
	boolean userExists(String userEmail);

	/** 이메일로 userNo 가져오기 
	 * @param userEmail
	 * @return
	 */
	int getUserNo(String userEmail);

	/** userNo로 이름 가져오기 
	 * @param userNo
	 * @return
	 */
	String getUserName(Integer userNo);

	/** userNo로 프로필 이미지 가져오기 
	 * @param userNo
	 * @return
	 */
	String getUserProfileImg(Integer userNo);

	
	

}
