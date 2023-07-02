package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.User;
import io.bajeal.pasteleria.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    final private UserService service;

    //METODO PARA MAPEAR TODOS LOS USERS
    @GetMapping("/users")
    public ResponseEntity<GetUsersResponse> getUsers() {
        GetUsersResponse response = new GetUsersResponse();
        response.setUsers(service.getListUser());
        return ResponseEntity.ok(response);
    }

    //METODO POST PARA CREAR UN NUEVO USER
    @PostMapping("/users")
    public ResponseEntity<PostUserResponse> post(@RequestBody User user) {
        int id = service.addUser(user);
        PostUserResponse response = new PostUserResponse();
        response.setId(id);
        return ResponseEntity.ok(response);

    }


}
