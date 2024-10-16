package com.album.react.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	private int userNo; 
	private String userName; 
	private String userEmail;
	private String userProfile;
	private String registerDate; 
	private String userDelFl; 

}
