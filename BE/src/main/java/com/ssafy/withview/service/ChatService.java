package com.ssafy.withview.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import com.ssafy.withview.constant.RoomType;
import com.ssafy.withview.dto.ChatMessageDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatService {

	private final ChannelTopic chatRoomChannelTopic;
	private final RedisTemplate redisTemplate;

	/**
	 * destination 정보에서 roomId 추출
	 */
	public Long getChannelSeq(String destination) {
		String[] split = destination.split("/");
		return Long.valueOf(split[4]);
	}

	public RoomType getRoomType(String destination) {
		String[] split = destination.split("/");
		return RoomType.valueOf(split[3]);
	}

	/**
	 * 채팅방에 메시지 발송
	 */
	public void sendChatMessage(ChatMessageDto chatMessage) {
		// chatMessage.setUserCount(channelChatRepository.getUserCount(chatMessage.getUserSeq()));

		redisTemplate.convertAndSend(chatRoomChannelTopic.getTopic(), chatMessage);
	}
}
