package wushu.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Athlete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    @Temporal(TemporalType.DATE) // Вказуємо, що тип даних - DATE
    private Date birthDate;

    @Enumerated(EnumType.STRING)
    private ProgramType programType;

//    @Column(updatable = false)
//    private String createdBy;
//
//    @PrePersist
//    protected void onCreate() {
//
//    }
}
