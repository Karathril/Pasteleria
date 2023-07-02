package io.bajeal.pasteleria.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Contacto {
    private int id;
    private String name;
    private String email;
    private String asunto;
    private String mensaje;

}
