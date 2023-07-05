package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.Contacto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class GetContactosResponse {
    private List<Contacto> contactos;
}
