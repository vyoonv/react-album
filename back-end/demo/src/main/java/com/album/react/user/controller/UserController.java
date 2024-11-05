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
	
	/** 로그인 / 최초 로그인 시 회원가입 처리 
	 * @param user
	 * @return
	 */
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user) {
		
		log.info("user : " + user ); 
		
		service.saveUser(user); 
		
		return ResponseEntity.ok("환영합니다~"); 
	}
	
	/** 기존 회원 여부 확인 
	 * @param request
	 * @return
	 */
	@PostMapping("/checkUser")
	public ResponseEntity<Map<String, Object>> checkUser( @RequestBody Map<String, String> request) {
		
		String userEmail = request.get("userEmail"); 
		boolean exists = service.userExists(userEmail); 
		
		Map<String, Object> response = new HashMap<>(); 
		response.put("exists", exists); 
		
		return ResponseEntity.ok(response);
		
	}

}
