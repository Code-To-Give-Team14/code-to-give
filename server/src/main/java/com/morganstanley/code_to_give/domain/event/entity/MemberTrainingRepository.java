package com.morganstanley.code_to_give.domain.event.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberTrainingRepository extends JpaRepository<MemberTraining, Integer> {
}
