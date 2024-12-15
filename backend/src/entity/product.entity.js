"use strict";
import { EntitySchema, JoinTable } from "typeorm";

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
    relations: {
        proveedores: {
            type: "many-to-one",
            target: "Proveedor",
            inverseSide: "productos", // Relación inversa
        },
        venta: {
            type: "many-to-many",
            target: "Venta", // Relación con la entidad Venta
            inverseSide: "productos", // Relación inversa
        },
        
    },
    //VER IMPLEMENTACION DE INDICES

});

export default ProductSchema;