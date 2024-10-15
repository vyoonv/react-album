
package com.album.react.user.model.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.album.react.user.model.dto.User;
import com.album.react.user.model.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {
	
	private UserMapper mapper; 

	@Override
	public void saveUser(User user) {
		
		user.setRegisterDate(LocalDateTime.now().toString());
		user.setUserDelFl("N");
		mapper.saveUser(user); 
		
	}

}
