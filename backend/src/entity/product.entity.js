"use strict";
import { EntitySchema } from "typeorm";

//CREACION DE TABLA PRODUCTOS
const ProductSchema = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        id: {
            type : "int",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
            length: 50,
            nullable: false,
            unique: true,
        },
        description: {
            type: "varchar",
            length: 255,
            nullable: true
        },
        stock: {
            type: "int",
            nullable: false,

        },
        price: {
            type: "int",
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: ()=> "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: ()=> "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        }
    },
    //VER IMPLEMENTACION DE INDICES

});

export default ProductSchema;