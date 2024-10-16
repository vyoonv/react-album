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

	
	

}
