package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.User;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostUserResponse {
    private User user;
    private int id;
}
