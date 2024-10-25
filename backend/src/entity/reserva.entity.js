"use strict";
import { EntitySchema } from "typeorm";

const ReservaSchema = new EntitySchema({
    name: "Reserva",
    tableName: "reservas",
    columns: {
        idreserva: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombreReservador: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        email: {  
            type: "varchar",
            length: 255,
            nullable: false,
            unique: true,
        },
        motivo: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        fecha: {
            type: "date",
            nullable: false,
        },
        hora: {
            type: "varchar",
            nullable: false,
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
    /*indices: [
        {
            name: "IDX_RESERVA",
            columns: ["idreserva"],
            unique: true,
        },
        {
            name: "IDX_RESERVA_EMAIL",
            columns: ["email"],
            unique: true,
        },
    ],*/
});
  
  export default ReservaSchema;