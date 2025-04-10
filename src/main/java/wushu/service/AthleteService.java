package wushu.service;

import wushu.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wushu.dto.AthleteDTO;
import wushu.entity.Athlete;
import wushu.mapper.AthleteMapper;
import wushu.repository.AthleteRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AthleteService {
    private final AthleteRepository athleteRepository;
    private final AthleteMapper athleteMapper;

    public List<AthleteDTO> getAllAthletes() {

        return athleteRepository.findAll()
                .stream()
                .map(athleteMapper::toDto)
                .collect(Collectors.toList());
    }

    public AthleteDTO getAthleteById(Long id) {
        Athlete athlete = athleteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Athlete not found"));
        return athleteMapper.toDto(athlete);

    }

    public AthleteDTO createAthlete(AthleteDTO athleteDTO) {
        Athlete athlete = athleteMapper.toEntity(athleteDTO);
        Athlete savedAthlete = athleteRepository.save(athlete);
        return athleteMapper.toDto(savedAthlete);
    }

//    public AthleteDTO updateAthlete(Long id, AthleteDTO athleteDTO) {
//        Athlete existingAthlete = athleteRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Athlete not found"));
//        athleteMapper.updateEntity(existingAthlete, athleteDTO);
//        Athlete updatedAthlete = athleteRepository.save(existingAthlete);
//        return athleteMapper.toDto(updatedAthlete);
//    }
public AthleteDTO updateAthlete(Long id, AthleteDTO athleteDTO) {
    Athlete existingAthlete = athleteRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Athlete not found with id: " + id));

    // Оновлюємо поля, але не змінюємо id
    existingAthlete.setFirstName(athleteDTO.firstName());
    existingAthlete.setLastName(athleteDTO.lastName());
    existingAthlete.setBirthDate(athleteDTO.birthDate());
    existingAthlete.setProgramType(athleteDTO.programType());

    Athlete updatedAthlete = athleteRepository.save(existingAthlete);
    return athleteMapper.toDto(updatedAthlete);
}
    public void deleteAthlete(Long id) {
        if(!athleteRepository.existsById(id)){
            throw new NotFoundException("Athlete not found with id: " + id);
        }
        athleteRepository.deleteById(id);
    }
}
