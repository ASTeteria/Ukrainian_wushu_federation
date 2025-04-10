package wushu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wushu.entity.Athlete;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {

}
