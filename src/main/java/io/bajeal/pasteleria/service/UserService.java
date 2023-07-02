package io.bajeal.pasteleria.service;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.bajeal.pasteleria.models.Category;
import io.bajeal.pasteleria.models.Contacto;
import io.bajeal.pasteleria.models.Product;
import io.bajeal.pasteleria.models.User;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private List<User> users;
    private ObjectMapper objectMapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    private File jsonFile = new File("products.json");

    public UserService() {
        users = new ArrayList<>();
        loadProductsFromJsonFile();
    }

    public User createUser(User user) {
        users.add(user);
        saveProductsToJsonFile();
        return user;
    }

    public List<User> getListUser() {
        return users;
    }

    public int addUser(User user){
        List<User> users = getListUser();
        int id = users.size()+1;
        user.setId(id);
        users.add(user);
        return id;
    }



    private void loadProductsFromJsonFile() {
        try {
            if (jsonFile.exists()) {
                JsonNode rootNode = objectMapper.readTree(jsonFile);

                // CARGAR users
                JsonNode usersNode = rootNode.get("users");
                if (usersNode != null) {
                    users = objectMapper.readValue(usersNode.traverse(), new TypeReference<List<User>>() {
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

            // GUARDAR PRODUCTS
            rootNode.set("users", objectMapper.valueToTree(users));

            objectMapper.writeValue(jsonFile, rootNode);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
