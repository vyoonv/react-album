package com.album.react.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.album.react.user.model.dto.User;
import com.album.react.user.model.service.UserService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class UserController {
	
	private final UserService service; 
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user) {
		
		service.saveUser(user); 
		
		return ResponseEntity.ok("환영합니다~"); 
	}

}
