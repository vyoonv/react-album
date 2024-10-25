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

	/** userEmail로 userNo 가져오기
	 * @param userEmail
	 * @return
	 */
	int getUserNo(String userEmail);

	/** userName 가져오기 
	 * @param userNo
	 * @return
	 */
	String getUserName(Integer userNo);

	/** profileImg 가져오기 
	 * @param userNo
	 * @return
	 */
	String getUserProfileImg(Integer userNo);

}
