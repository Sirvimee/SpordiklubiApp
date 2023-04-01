package ee.planet.meeli.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer mobile;
    private float weight;
    private Integer height;
    private float bmi;
    private String bmiResult;
    private String gender;
    private String requireTrainer;
    private String packageType;
    private List<String> goal;
    private String haveGymBefore;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate packageStart;
}
