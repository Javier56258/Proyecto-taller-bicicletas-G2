"use strict"
import { EntitySchema, JoinTable } from "typeorm"; 

const VentaSchema = new EntitySchema({
    name: "Venta",
    tableName: "ventas",
    columns: {
        idVenta: {
            primary: true,
            type: "int",
            generated: true
        },
        fecha: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
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