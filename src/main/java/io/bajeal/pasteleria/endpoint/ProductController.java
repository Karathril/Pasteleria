package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.Category;
import io.bajeal.pasteleria.models.Product;
import io.bajeal.pasteleria.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController {
    final private ProductService service;

    //METODO PARA MAPEAR TODOS LOS PRODUCTOS
    @GetMapping("/products")
    public ResponseEntity<GetProductsResponse> getProducts() {
        GetProductsResponse response = new GetProductsResponse();
        response.setProducts(service.getListProducts());
        return ResponseEntity.ok(response);
    }
    //METODO PARA MAPEAR UN PRODUCTO SEGUN SU ID
    @GetMapping("/products/{id}")
    public ResponseEntity<GetProductResponse> getProducts(@PathVariable("id") int id){
        Product productById = service.getProductById(id);
        if(productById != null){
            GetProductResponse response = new GetProductResponse();
            response.setProduct(productById);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    //METODO PARA MAPEAR TODOS LOS PRODUCTOS SEGUN SU CATEGORIA
    @GetMapping("/products/category/{categoryId}")
    public ResponseEntity<List<Product>> getProductsByCategoryId(@PathVariable int categoryId) {
        List<Product> productsByCategoryId= service.getProductsByCategoryId(categoryId);
        if (productsByCategoryId.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(productsByCategoryId, HttpStatus.OK);
        }
    }

    //METODO POST PARA CREAR UN NUEVO PRODUCTO
    @PostMapping("/products")
    public ResponseEntity<PostProductResponse> post(@RequestBody Product product) {
        int id = service.addProduct(product);
        PostProductResponse response = new PostProductResponse();
        response.setId(id);
        return ResponseEntity.ok(response);

    }

    //METODO PARA ACTUALIZAR UN PRODUCTO ESPECIFICO
    @PutMapping("/products/{id}")
    public ResponseEntity<PutProductResponse> update(@PathVariable("id") int id, @RequestBody Product updateProduct){
        Product update = service.updateProduct(id, updateProduct);
        if (update != null){
            PutProductResponse response = new PutProductResponse();
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    //METODO PARA ELEMINAR UN PRODUCTO ESPECIFICO
    @DeleteMapping("/products/{id}")
    public ResponseEntity<DeleteProductResponse>delete(@PathVariable("id")int id){
        Product deleted = service.deleteProduct(id);
        if (deleted != null){
            DeleteProductResponse response = new DeleteProductResponse();
            response.setProduct(deleted);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

}//FINAL CLASS
