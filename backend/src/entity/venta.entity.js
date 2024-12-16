"use strict"
import { EntitySchema, JoinTable } from "typeorm"; 

const VentaSchema = new EntitySchema({
    name: "Venta",
    tableName: "ventas",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombreProducto: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        fecha: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
        cantidad: {
            type: "int",
            nullable: false,
        },
        total: {
            type: "decimal"
        },
          
    },
    relations: {
        productos: {
            type: "one-to-many",
            target: "products",
            inverseSide: "venta",
            JoinTable: true,
        }
    }

});

export default VentaSchema;