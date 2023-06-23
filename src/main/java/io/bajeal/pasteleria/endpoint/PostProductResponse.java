package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.Product;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostProductResponse {
    private Product product;
    private int id;
}
