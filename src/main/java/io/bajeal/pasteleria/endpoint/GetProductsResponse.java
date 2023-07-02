package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class GetProductsResponse {
    private List<Product> products;
}
