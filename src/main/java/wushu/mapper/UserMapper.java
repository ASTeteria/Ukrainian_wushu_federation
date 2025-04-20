package wushu.mapper;

import org.mapstruct.Mapper;
import wushu.dto.UserDTO;
import wushu.entity.User;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User user);
    User toEntity(UserDTO userDTO);
    List<UserDTO> toListDto(List<User> users);
}
