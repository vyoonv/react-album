package com.album.react.user.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.album.react.user.model.dto.User;

@Mapper
public interface UserMapper {

	/** 회원 정보 저장 
	 * @param user
	 */
	void saveUser(User user);

	/** 존재하는 회원인지 여부 확인 
	 * @param userEmail
	 * @return
	 */
	int userExists(String userEmail);

}
