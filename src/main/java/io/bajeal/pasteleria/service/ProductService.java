package io.bajeal.pasteleria.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.bajeal.pasteleria.models.Category;
import io.bajeal.pasteleria.models.Product;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private List<Product> products;
    private List<Category> categories = new ArrayList<>();
    private ObjectMapper objectMapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    private File jsonFile = new File("products.json");

    public ProductService() {
        products = new ArrayList<>();
        loadProductsFromJsonFile();
    }

    public Product createProduct(Product product) {
        products.add(product);
        saveProductsToJsonFile();
        return product;
    }

    public List<Product> getListProducts() {
        return products;
    }

    public Product getProductById(int id) {
        return products.stream()
                .filter(product -> product.getId()==(id))
                .findFirst()
                .orElse(null);
    }

    public List<Product> getProductsByCategoryId(int categoryId) {
        return products.stream()
                .filter(product -> product.getCategoryId() == categoryId)
                .collect(Collectors.toList());
    }
    public int addProduct(Product product){
        List<Product> products = getListProducts();
        int id = products.size()+1;
        product.setId(id);
        products.add(product);
        return id;
    }
    public Product updateProduct(int id, Product updateProduct) {
        Product product = getProductById(id);
        if (product != null) {
            product.setName(updateProduct.getName());
            product.setDescription(updateProduct.getDescription());
            product.setPrice(updateProduct.getPrice());
            product.setCategoryId(updateProduct.getCategoryId());
            saveProductsToJsonFile();
        }
        return product;
    }

    public Product deleteProduct(int id) {
        Product product = getProductById(id);
        if (product != null) {
            products.remove(product);
            saveProductsToJsonFile();
        }
        return product;
    }

    public Category getCategoryById(int id) {
        return categories.stream()
                .filter(category -> category.getId()==id)
                .findFirst()
                .orElse(null);
    }

    private void loadProductsFromJsonFile() {
        try {
            if (jsonFile.exists()) {
                JsonNode rootNode = objectMapper.readTree(jsonFile);

                // CARGAR PRODUCTS
                JsonNode productsNode = rootNode.get("products");
                if (productsNode != null) {
                    products = objectMapper.readValue(productsNode.traverse(), new TypeReference<List<Product>>() {
                    });
                }

                // CARGAR CATEGORIES
                JsonNode categoriesNode = rootNode.get("categories");
                if (categoriesNode != null) {
                    categories = objectMapper.readValue(categoriesNode.traverse(), new TypeReference<List<Category>>() {
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
            rootNode.set("products", objectMapper.valueToTree(products));

            // GUARDAR CATEGORIES
            rootNode.set("categories", objectMapper.valueToTree(categories));

            objectMapper.writeValue(jsonFile, rootNode);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}