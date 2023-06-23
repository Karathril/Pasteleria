package io.bajeal.pasteleria.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Product {
    private int id;
    private String name;
    private String description;
    private String price;
    private int categoryId;
    private String image;

}
