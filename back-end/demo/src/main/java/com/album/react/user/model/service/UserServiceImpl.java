
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

}
