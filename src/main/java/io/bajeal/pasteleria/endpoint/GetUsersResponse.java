package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class GetUsersResponse {
    private List<User> users;
}

