package wushu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wushu.entity.CompetitionApplication;

@Repository
public interface CompetitionApplicationRepository extends JpaRepository<CompetitionApplication, Long> {
}
