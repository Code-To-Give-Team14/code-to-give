package com.morganstanley.code_to_give.domain.event;

import com.morganstanley.code_to_give.domain.event.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Integer> {
}
