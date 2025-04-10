package wushu.service;

import wushu.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wushu.dto.ContactCompetitionApplicationDTO;
import wushu.entity.ContactCompetitionApplication;
import wushu.mapper.ContactCompetitionApplicationMapper;
import wushu.repository.ContactCompetitionApplicationRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactCompetitionApplictionService {
    private final ContactCompetitionApplicationRepository contactCompetitionApplicationRepository;
    private final ContactCompetitionApplicationMapper contactCompetitionApplicationMapper;

    public List<ContactCompetitionApplicationDTO> getAllApplications() {

        return contactCompetitionApplicationRepository.findAll()
                .stream()
                .map(contactCompetitionApplicationMapper::toDto)
                .collect(Collectors.toList());
    }

    public ContactCompetitionApplicationDTO getApplicationById(Long id) {
        ContactCompetitionApplication application = contactCompetitionApplicationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Application not found"));
        return contactCompetitionApplicationMapper.toDto(application);
    }

    public ContactCompetitionApplicationDTO createApplication(ContactCompetitionApplicationDTO applicationDTO) {
        ContactCompetitionApplication application = contactCompetitionApplicationMapper.toEntity(applicationDTO);
        ContactCompetitionApplication savedApplication = contactCompetitionApplicationRepository.save(application);
        return contactCompetitionApplicationMapper.toDto(savedApplication);
    }

//    public ContactCompetitionApplicationDTO updateApplication(Long id, ContactCompetitionApplicationDTO applicationDTO) {
//        ContactCompetitionApplication existingApplication = contactCompetitionApplicationRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Application not found"));
//        contactCompetitionApplicationMapper.updateEntity(existingApplication, applicationDTO);
//        return contactCompetitionApplicationMapper.toDto(existingApplication);
//    }
public ContactCompetitionApplicationDTO updateApplication(Long id, ContactCompetitionApplicationDTO applicationDTO) {
    ContactCompetitionApplication existingApplication = contactCompetitionApplicationRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Competition application not found with id: " + id));

    // Оновлюємо поля, але не змінюємо id
    existingApplication.setCompetitionName(applicationDTO.competitionName());
    existingApplication.setAthleteFirstName(applicationDTO.athleteFirstName());
    existingApplication.setAthleteLastName(applicationDTO.athleteLastName());
    existingApplication.setBirthDate(applicationDTO.birthDate());
    existingApplication.setGender(applicationDTO.gender());
    existingApplication.setAgeCategory(applicationDTO.ageCategory());
    existingApplication.setContactProgram(applicationDTO.contactProgram());
    existingApplication.setWeightCategory(applicationDTO.weightCategory());


    ContactCompetitionApplication updatedApplication = contactCompetitionApplicationRepository.save(existingApplication);
    return contactCompetitionApplicationMapper.toDto(updatedApplication);
}

    public void deleteApplication(Long id) {
        if (!contactCompetitionApplicationRepository.existsById(id)) {
            throw new NotFoundException("CompetitionApplication not found with id: " + id);
        }

        contactCompetitionApplicationRepository.deleteById(id);
    }
}


