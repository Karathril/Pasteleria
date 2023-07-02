package io.bajeal.pasteleria.endpoint;
import io.bajeal.pasteleria.models.Contacto;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostContactoResponse {
    private Contacto contacto;
    private int id;
}