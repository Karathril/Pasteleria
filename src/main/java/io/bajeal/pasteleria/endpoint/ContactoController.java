package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.Contacto;
import io.bajeal.pasteleria.service.ContactoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ContactoController {
    final private ContactoService service;

    @GetMapping("/contactos")
    public ResponseEntity<GetContactosResponse> getUsers() {
        GetContactosResponse response = new GetContactosResponse();
        response.setContactos(service.getListContacto());
        return ResponseEntity.ok(response);
    }
    @PostMapping("/contactos")
    public ResponseEntity<PostContactoResponse> post(@RequestBody Contacto contacto) {
        int id = service.addContacto(contacto);
        PostContactoResponse response = new PostContactoResponse();
        response.setId(id);
        return ResponseEntity.ok(response);

    }
}
