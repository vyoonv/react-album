
package com.album.react.user.model.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.album.react.user.model.dto.User;
import com.album.react.user.model.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
	
	private final UserMapper mapper; 

	/**
	 * 회원 정보 저장 
	 */
	@Override
	public User saveUser(User user) {
		
		mapper.saveUser(user);
		
		return user; 
		
	}

	/**
	 * 존재하는 회원인지 여부 확인 
	 */
	@Override
	public boolean userExists(String userEmail) {
		
		return mapper.userExists(userEmail) > 0;
	}

	/**
	 * userEmail로 userNo 가져오기 
	 */
	@Override
	public int getUserNo(String userEmail) {
		
		return mapper.getUserNo(userEmail);
	}

	/**
	 * userName 가져오기 
	 */
	@Override
	public String getUserName(Integer userNo) {
		
		return mapper.getUserName(userNo);
	}

	/**
	 * profileImg 가져오기 
	 */
	@Override
	public String getUserProfileImg(Integer userNo) {
		
		return mapper.getUserProfileImg(userNo);
	}

}
