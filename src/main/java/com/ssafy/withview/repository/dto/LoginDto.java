package com.ssafy.withview.repository.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class LoginDto {
	private String id;
	private String password;
	private String roles;
}
