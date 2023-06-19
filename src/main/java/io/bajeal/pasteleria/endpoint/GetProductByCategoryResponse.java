package io.bajeal.pasteleria.endpoint;

import io.bajeal.pasteleria.models.Product;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GetProductByCategoryResponse {
    Product product;
}
