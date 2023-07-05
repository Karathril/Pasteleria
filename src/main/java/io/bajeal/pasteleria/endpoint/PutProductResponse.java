package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PutProductResponse {
    private Product product;
}
