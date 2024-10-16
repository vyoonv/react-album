package com.album.react.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.album.react.user.model.dto.User;
import com.album.react.user.model.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@Controller
@RequiredArgsConstructor
public class UserController {
	
	private final UserService service; 
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user) {
		
		log.info("user : " + user ); 
		
		service.saveUser(user); 
		
		return ResponseEntity.ok("환영합니다~"); 
	}
	
	@PostMapping("/checkUser")
	public ResponseEntity<Map<String, Object>> checkUser( @RequestBody Map<String, String> request) {
		
		String userEmail = request.get("userEmail"); 
		boolean exists = service.userExists(userEmail); 
		
		Map<String, Object> response = new HashMap<>(); 
		response.put("exists", exists); 
		
		return ResponseEntity.ok(response);
		
	}

}
