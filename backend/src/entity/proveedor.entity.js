"use strict";
import { EntitySchema, JoinColumn } from "typeorm";

const ProveedorSchema = new EntitySchema({
    name: "proveedor",
    tableName: "proveedores",
    columns: {
        idProveedor: {
            type: "int",
            primary: true,
            generated: true
        },
        nombreProveedor: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        PaginaWeb: {
            type: "varchar",
            length: 255,
        },
        telefono: {
            type: "varchar",
            length: 15,
        },
        email: {
            type: "varchar",
            length: 255,
        },
        direccion: {
            type: "varchar",
            length: 255,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        }
    },
    relations: {
        productos: {
            type: "many-to-many",
            target: "products",
            inverseSide: "proveedores",
        },
    },
    
    /*indices: [
        {
            name: "IDX_PROVEEDOR",
            columns: ["idProveedor"],
            unique: true,
        },
        {
            name: "IDX_PROVEEDOR_EMAIL",
            columns: ["email"],
            unique: true,
        },
    ],*/
});
  
export default ProveedorSchema;
