package com.ssafy.withview.repository;

import com.ssafy.withview.repository.entity.ServerEntity;
import com.ssafy.withview.repository.entity.UserEntity;
import com.ssafy.withview.repository.entity.UserServerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserServerRepository extends JpaRepository<UserServerEntity,Long> {
    List<UserServerEntity> findAllServerByUserEntity(UserEntity userEntity);
}