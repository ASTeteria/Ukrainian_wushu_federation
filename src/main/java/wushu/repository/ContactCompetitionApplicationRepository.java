package wushu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wushu.entity.ContactCompetitionApplication;

@Repository
public interface ContactCompetitionApplicationRepository extends JpaRepository<ContactCompetitionApplication, Long> {
}
