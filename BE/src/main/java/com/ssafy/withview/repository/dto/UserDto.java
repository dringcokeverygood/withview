package com.ssafy.withview.repository.dto;

import java.time.LocalDate;

import com.ssafy.withview.repository.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	private long seq;
	private String id;
	private String nickname;
	private String realName;
	private String telephone;
	private String address;
	private String email;
	private String profileImgSearchName;
	private String profileImgOriginalName;
	private LocalDate createTime;
	private LocalDate deleteTime;

	public static UserEntity toEntity(UserDto userDto) {
		if (userDto == null) {
			return null;
		}
		return UserEntity.builder()
			.id(userDto.getId())
			.nickname(userDto.getNickname())
			.realName(userDto.getRealName())
			.telephone(userDto.getTelephone())
			.address(userDto.getAddress())
			.email(userDto.getEmail())
			.profileImgSearchName(userDto.getProfileImgSearchName())
			.profileImgOriginalName(userDto.getProfileImgOriginalName())
			.createTime(userDto.getCreateTime())
			.deleteTime(userDto.getDeleteTime())
			.build();
	}
}