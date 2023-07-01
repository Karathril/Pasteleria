package io.bajeal.pasteleria.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.bajeal.pasteleria.models.Contacto;
import io.bajeal.pasteleria.models.User;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ContactoService {
    private List<Contacto> contactos;
    private ObjectMapper objectMapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    private File jsonFile = new File("products.json");

    public ContactoService() {
        contactos = new ArrayList<>();
        loadProductsFromJsonFile();
    }

    public Contacto createContacto(Contacto contacto) {
        contactos.add(contacto);
        saveProductsToJsonFile();
        return contacto;
    }
    public List<Contacto> getListContacto() {
        return contactos;
    }

    public int addContacto(Contacto contacto){
        List<Contacto> contactos = getListContacto();
        int id = contactos.size()+1;
        contacto.setId(id);
        contactos.add(contacto);
        return id;
    }

    private void loadProductsFromJsonFile() {
        try {
            if (jsonFile.exists()) {
                JsonNode rootNode = objectMapper.readTree(jsonFile);

               // CARGAR contactos
                JsonNode contactosNode = rootNode.get("contactos");
                if (contactosNode != null) {
                    contactos = objectMapper.readValue(contactosNode.traverse(), new TypeReference<List<Contacto>>() {
                    });
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void saveProductsToJsonFile() {
        try {
            ObjectNode rootNode = objectMapper.createObjectNode();


            // GUARDAR CATEGORIES
            rootNode.set("contactos", objectMapper.valueToTree(contactos));

            objectMapper.writeValue(jsonFile, rootNode);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



}
