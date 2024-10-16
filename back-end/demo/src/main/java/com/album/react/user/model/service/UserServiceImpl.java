
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

	@Override
	public User saveUser(User user) {
		
//		user.setRegisterDate(LocalDateTime.now().toString());
//		user.setUserDelFl("N");
		mapper.saveUser(user);
		
		return user; 
		
	}

}
