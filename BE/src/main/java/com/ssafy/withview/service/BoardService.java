package com.ssafy.withview.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.withview.dto.BoardDto;
import com.ssafy.withview.entity.BoardEntity;
import com.ssafy.withview.entity.UserEntity;
import com.ssafy.withview.repository.BoardRepository;
import com.ssafy.withview.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardService {

	private final BoardRepository boardRepository;

	private final UserRepository userRepository;

	/**
	 * 게시글 작성 및 수정
	 *
	 * @param boardDto (작성자 pk 값, 제목, 내용, 프리셋 이름)
	 */
	@Transactional
	public void writeBoardArticle(BoardDto boardDto) {
		UserEntity userEntity = userRepository.findBySeq(boardDto.getUserSeq())
			.orElseThrow(() -> new IllegalArgumentException("일치하는 회원 정보가 없습니다."));

		boardRepository.save(BoardEntity.builder()
			.userSeq(boardDto.getUserSeq())
			.nickname(userEntity.getNickname())
			.title(boardDto.getTitle())
			.content(boardDto.getContent())
			.presetImgSearchName(boardDto.getPresetImgSearchName())
			.build());
	}

	/**
	 * 게시글 목록
	 *
	 * @return BoardDto List (게시글 pk 값, 작성자 닉네임, 제목, 내용, 등록일)
	 */
	@Transactional
	public List<BoardDto> getBoardArticles() {
		return boardRepository.findAll().stream()
			.map(b -> BoardDto.builder()
				.seq(b.getSeq())
				.nickname(b.getNickname())
				.title(b.getTitle())
				.content(b.getContent())
				.registerTime(b.getRegisterTime())
				.build())
			.collect(Collectors.toList());
	}

	/**
	 * 게시글 상세 정보
	 *
	 * @param seq (게시글 seq)
	 * @return BoardDto (작성자 닉네임, 제목, 내용, 등록일, 이미지 png 이름)
	 */
	public BoardDto getBoardArticle(Long seq) {
		BoardEntity boardEntity = boardRepository.findBySeq(seq)
			.orElseThrow(() -> new IllegalArgumentException("일치하는 게시글이 없습니다."));

		return BoardDto.builder()
			.nickname(boardEntity.getNickname())
			.title(boardEntity.getTitle())
			.content(boardEntity.getContent())
			.registerTime(boardEntity.getRegisterTime())
			.presetImgSearchName(boardEntity.getPresetImgSearchName())
			.build();
	}

}
