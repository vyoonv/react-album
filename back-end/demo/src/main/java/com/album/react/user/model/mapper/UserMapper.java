package com.album.react.user.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.album.react.user.model.dto.User;

@Mapper
public interface UserMapper {

	void saveUser(User user);

}
